import { useEffect, useState } from "react";
import { useCommonStore, useModalStore } from "../../stores";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { useNavigate } from "react-router-dom";
import useConfirm from "../../hooks/useConfirm";
import { majorSchemas } from "../../dataTable/majorTable";
import { uploadFile } from "../../utils";
import { ModalName, pathNames } from "../../constants";
import { useMajorStore } from "../../stores/majorStore";
import { teachers } from "../../dataTable/teacherTable"; // Import teachers
import { useToast } from "../../hooks/useToast";
import { Button } from "primereact/button";
import ExcelJS from "exceljs";
import { exportExcel } from "../../utils/my-export-excel";
import dayjs from "dayjs";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const Major = () => {
  const { onToggle } = useModalStore();

  const actionTable: IActionTable[] = [
    {
      onClick: (data, options) => {
        // const transferData = teachers.map((item) => {
        //   return { content: item.code, subcontent: item.name };
        // });
        onToggle(ModalName.ADD_TEACHER, {
          header: "Thêm giảng viên",
          content: { id: data.id, contents: data.teachers },
          style: "tw-w-[90%] md:tw-w-[30rem]",
        });
      },
      tooltip: "Thêm giảng viên",
      icon: "pi-user-plus",
    },
    {
      onClick: (data, options) => {
        handleScoreColumn(data);
      },
      tooltip: "Quản lý cột điểm",
      icon: "pi-chart-bar",
      severity: "help",
    },
    {
      onClick: (data, options) => {
        handleEdit(data);
      },
      tooltip: "Sửa",
      icon: "pi-pencil",
      severity: "warning",
    },
    {
      onClick: (data, options) => {
        handleDelete(data.id);
      },
      tooltip: "Xóa",
      icon: "pi-trash",
      severity: "danger",
    },
  ];

  const navigate = useNavigate();
  const { onConfirm } = useConfirm();
  const { showToast } = useToast();
  const { setHeaderTitle, setHeaderActions, resetActions, isLoadingApi } =
    useCommonStore();
  const {
    majors,
    majorsUnlimited,
    total,
    deleteMajor,
    fetchMajors,
    importMajors,
  } = useMajorStore();

  const [dataImports, setDataImports] = useState<any[]>([]);
  const { onDismiss } = useModalStore();
  const { setContent, setFooter } = useModalStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = (data: any) => {
    navigate(`${pathNames.MAJOR}/edit/${data.id}`);
  };
  const handleScoreColumn = (data: any) => {
    navigate(`${pathNames.MAJOR}/score-column-management/${data.id}`);
  };
  const handleDelete = (id: number) => {
    const data = {
      message: "Bạn có chắc chắn muốn xoá môn học này?",
      header: "Xác nhận xoá",
      onAccept: async () => {
        const result = await deleteMajor(id);
        if (!result) {
          return showToast({
            severity: "danger",
            summary: "Thông báo",
            message: "Xóa thất bại",
            life: 3000,
          });
        }
        showToast({
          severity: "success",
          summary: "Thông báo",
          message: "Xóa thành công",
          life: 3000,
        });
      },
      onReject: () => {
        console.log("Đã hủy bỏ hành động.");
      },
    };
    onConfirm(data);
  };

  useEffect(() => {
    if (dataImports.length > 0) {
      setContent(
        <DataTable
          scrollable
          value={dataImports.map((item, index) => ({
            ...item,
            index: index + 1,
          }))}
          tableStyle={{ minWidth: "50rem" }}
        >
          {majorSchemas.map((col, i) => (
            <Column key={col.prop} field={col.prop} header={col.label} />
          ))}
        </DataTable>
      );
      setFooter(
        <div>
          <a href="/danhsachmon.xlsx" download={"danhsachmon.xlsx"}>
            <Button label="Download mẫu"></Button>
          </a>
          <Button label="Chọn file import" onClick={handleChooseFile}></Button>
          <Button label="Import" onClick={handleImport}></Button>,
        </div>
      );
    }
  }, [dataImports]);
  const handleOpenModal = () => {
    onToggle(ModalName.REVIEW_IMPORT, {
      header: "Import danh sách môn học",
      content: (
        <DataTable
          scrollable
          value={dataImports.map((item, index) => ({
            ...item,
            index: index + 1,
          }))}
          tableStyle={{ minWidth: "50rem" }}
        >
          {majorSchemas.map((col, i) => (
            <Column key={col.prop} field={col.prop} header={col.label} />
          ))}
        </DataTable>
      ),
      footer: (
        <div>
          <a href="/danhsachmon.xlsx" download={"danhsachmon.xlsx"}>
            <Button label="Download mẫu"></Button>
          </a>
          <Button label="Chọn file import" onClick={handleChooseFile}></Button>
          <Button label="Import" onClick={handleImport}></Button>,
        </div>
      ),
      // style: "tw-w-[90%] md:tw-w-[50rem]",
    });
  };
  const importExcel = async (file: any) => {
    try {
      const workbook = new ExcelJS.Workbook();

      // Convert the file to an ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      await workbook.xlsx.load(arrayBuffer);

      // Get the first worksheet
      const worksheet = workbook.getWorksheet(1); // 1-based index

      if (!worksheet) {
        showToast({
          severity: "danger",
          summary: "Thông báo",
          message: "Không tìm thấy worksheet",
          life: 3000,
        });
        return;
      }

      const data: any[] = [];

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
          const teachersCell = row.getCell(5)?.value || "";
          const teachersArray =
            typeof teachersCell === "string"
              ? teachersCell.split(",").map((entry) => {
                  const [code, name] = entry
                    .split("-")
                    .map((item) => item.trim());
                  return {
                    code: code || "",
                    name: name || "",
                  };
                })
              : [];

          const rowData = {
            index: row.getCell(1)?.value || "",
            code: row.getCell(2)?.value || "",
            name: row.getCell(3)?.value || "",
            faculty: row.getCell(4)?.value || "",
            teachers: teachersArray, // Array of { code, name }
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          data.push(rowData);
        }
      });

      console.log("Processed Data:", data);
      setDataImports(data);
    } catch (error) {
      showToast({
        severity: "danger",
        summary: "Thông báo",
        message: "Không thể đọc được file excel này",
        life: 3000,
      });
    }
  };

  const handleChooseFile = async () => {
    setIsLoading(true);
    const file = await uploadFile();
    importExcel(file);
    setIsLoading(false);
    // const mergedArray = mergeArrays(students, importData as []);
    // console.log(importData, students);
  };

  const handleImport = async () => {
    const result = await importMajors({ majors: dataImports });
    onDismiss();
    setDataImports([]);
    if (!result) {
      return showToast({
        severity: "danger",
        summary: "Thông báo",
        message: "Thêm thất bại",
        life: 3000,
      });
    }
    showToast({
      severity: "success",
      summary: "Thông báo",
      message: "Thêm thành công",
      life: 3000,
    });
    fetchMajors({});
  };

  useEffect(() => {
    setHeaderTitle("Quản lý môn học");
    setHeaderActions([
      {
        title: "Tạo",
        icon: "pi pi-plus",
        onClick: () => {
          navigate(`${pathNames.MAJOR}/create`);
        },
        type: "button",
        disabled: false,
      },
      {
        title: "Import",
        icon: "pi pi-file-import",
        onClick: async () => {
          handleOpenModal();
        },
        type: "file",
        disabled: false,
      },
      {
        title: "Export",
        icon: "pi pi-file-export",
        onClick: async () => {
          const data = await fetchMajors({ pagination: false });

          const headerContent = "Danh sách môn học";
          exportExcel(
            "Danh sách môn học",
            data.map((item, index) => {
              return {
                ...item,
                index: index + 1,
                faculty: item.faculty.name,
                createdAt: dayjs(item.createdAt).format("DD/MM/YYYY HH:mm:ss"),
                updatedAt: dayjs(item.updatedAt).format("DD/MM/YYYY HH:mm:ss"),
              };
            }),
            majorSchemas,
            headerContent
          );
        },
        type: "button",
        disabled: false,
      },
    ]);

    return () => {
      resetActions();
    };
  }, [majors, resetActions, setHeaderActions, setHeaderTitle]);

  const handleSearch = (query: Object) => {
    fetchMajors(query);
  };

  return (
    <div>
      <MyTable
        keySearch="name"
        data={majors.map((item, index) => ({
          ...item,
          index: index + 1,
          faculty: item.faculty.name,
        }))}
        schemas={majorSchemas}
        actions={actionTable}
        totalRecords={total}
        isLoading={isLoadingApi}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Major;
