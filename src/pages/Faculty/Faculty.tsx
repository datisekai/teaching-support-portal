import { useEffect, useState } from "react";
import { useCommonStore, useModalStore } from "../../stores";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { facultySchemas } from "../../dataTable/facultyTable";
import { useNavigate } from "react-router-dom";
import useConfirm from "../../hooks/useConfirm";
import { uploadFile } from "../../utils";
import { useFacultyStore } from "../../stores/facultyStore";
import { useToast } from "../../hooks/useToast";
import { ModalName, pathNames } from "../../constants";
import { Button } from "primereact/button";
import ExcelJS from "exceljs";
import { exportExcel } from "../../utils/my-export-excel";
import dayjs from "dayjs";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const Faculty = () => {
  const actionTable: IActionTable[] = [
    {
      onClick: (data) => handleEdit(data),
      tooltip: "Sửa",
      icon: "pi-pencil",
      severity: "warning",
    },
    {
      onClick: (data) => handleDelete(data.id),
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
  const { facultys, total, deleteFaculty, fetchFacultys, importFacultys } =
    useFacultyStore();

  const { onToggle } = useModalStore();
  const [dataImports, setDataImports] = useState<any[]>([]);
  const { onDismiss } = useModalStore();
  const { setContent, setFooter } = useModalStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = (data: any) => {
    navigate(`${pathNames.FACULTY}/edit/${data.id}`);
  };

  const handleDelete = (id: string) => {
    const data = {
      message: "Bạn có chắc chắn muốn xoá ngành học này?",
      header: "Xác nhận xoá",
      onAccept: async () => {
        const result = await deleteFaculty(parseInt(id));
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
      onReject: () => {},
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
          {facultySchemas.map((col, i) => (
            <Column key={col.prop} field={col.prop} header={col.label} />
          ))}
        </DataTable>
      );
      setFooter(
        <div>
          <a href="/danhsachnganh.csv" download={"danhsachnganh.csv"}>
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
      header: "Import danh sách ngành học",
      content: (
        <DataTable
          scrollable
          value={dataImports.map((item, index) => ({
            ...item,
            index: index + 1,
          }))}
          tableStyle={{ minWidth: "50rem" }}
        >
          {facultySchemas.map((col, i) => (
            <Column key={col.prop} field={col.prop} header={col.label} />
          ))}
        </DataTable>
      ),
      footer: (
        <div>
          <a href="/danhsachnganh.csv" download={"danhsachnganh.csv"}>
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

      // Check if worksheet is undefined
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

      // Process rows only if worksheet exists
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
          const rowData = {
            index: row.getCell(1)?.value || "",
            code: row.getCell(2)?.value || "",
            name: row.getCell(3)?.value || "",
            description: row.getCell(4)?.value || "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          data.push(rowData);
        }
      });
      console.log("chedkkk:", data);
      setDataImports(data);
      // return data;
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
    const result = await importFacultys({ faculties: dataImports });
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
    fetchFacultys({});
  };

  useEffect(() => {
    setHeaderTitle("Quản lý ngành học");
    setHeaderActions([
      {
        title: "Tạo",
        icon: "pi pi-plus",
        onClick: () => navigate(`${pathNames.FACULTY}/create`),
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
          const headerContent = "Danh sách ngành học";

          const data = await fetchFacultys({ pagination: false });
          exportExcel(
            "Danh sách ngành học",
            data.map((item, index) => {
              return {
                ...item,
                index: index + 1,
                // description: item.description.replace(/<[^>]*>/g, ""),
                createdAt: dayjs(item.createdAt).format("DD/MM/YYYY HH:mm:ss"),
                updatedAt: dayjs(item.updatedAt).format("DD/MM/YYYY HH:mm:ss"),
              };
            }),
            facultySchemas,
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
  }, [resetActions, setHeaderActions, setHeaderTitle, facultys]);

  const handleSearch = (query: Object) => {
    fetchFacultys(query);
  };

  return (
    <div>
      <MyTable
        keySearch="name"
        data={facultys.map((item, index) => ({
          ...item,
          index: index + 1,
        }))}
        schemas={facultySchemas}
        actions={actionTable}
        totalRecords={total}
        isLoading={isLoadingApi}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Faculty;
