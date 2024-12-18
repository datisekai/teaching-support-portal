import { useEffect, useMemo, useRef, useState } from "react";
import { useCommonStore, useModalStore } from "../../stores";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { useNavigate } from "react-router-dom";
import useConfirm from "../../hooks/useConfirm";
import {
  classes,
  classSchemas,
  exportClassSchemas,
} from "../../dataTable/classTable";
import { uploadFile } from "../../utils";
import { useClassStore } from "../../stores/classStore";
import { useToast } from "../../hooks/useToast";
import { exportExcel } from "../../utils/my-export-excel";
import { Button } from "primereact/button";
import { ModalName } from "../../constants";
import ExcelJS from "exceljs";
import dayjs from "dayjs";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const Class = () => {
  const navigate = useNavigate();
  const { onConfirm } = useConfirm();

  const { setHeaderTitle, setHeaderActions, resetActions, isLoadingApi } =
    useCommonStore();
  const {
    classes,
    classesUnlimited,
    total,
    fetchClasses,
    deleteClass,
    importClass,
  } = useClassStore();
  const { showToast } = useToast();

  const { onToggle, onDismiss } = useModalStore();
  const [dataImports, setDataImports] = useState<any[]>([]);
  const { setContent, setFooter } = useModalStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (endpoint: string, data: any) => {
    data;
    navigate(endpoint);
  };
  const handleDelete = (id: number) => {
    const data = {
      message: "Bạn có chắc chắn muốn xoá lớp học này?",
      header: "Xác nhận xoá",
      onAccept: async () => {
        const result = await deleteClass(id);
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
          {classSchemas.map((col, i) => (
            <Column key={col.prop} field={col.prop} header={col.label} />
          ))}
        </DataTable>
      );
      setFooter(
        <div>
          <a href="/danhsachlop.csv" download={"danhsachlop.csv"}>
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
      header: "Import danh sách lớp",
      content: (
        <DataTable
          scrollable
          value={dataImports.map((item, index) => ({
            ...item,
            index: index + 1,
          }))}
          tableStyle={{ minWidth: "50rem" }}
        >
          {classSchemas.map((col, i) => (
            <Column key={col.prop} field={col.prop} header={col.label} />
          ))}
        </DataTable>
      ),
      footer: (
        <div>
          <a href="/danhsachlop.csv" download={"danhsachlop.csv"}>
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
        if (rowNumber > 8) {
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
            name: row.getCell(2)?.value || "",
            duration: row.getCell(3)?.value || "",
            major: row.getCell(4)?.value || "",
            teacherCodes: teachersArray, // Array of { code, name }
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          data.push(rowData);
        }
      });

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
  };

  const handleImport = async () => {
    const result = await importClass({ classes: dataImports });
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
    fetchClasses({});
  };

  useEffect(() => {
    setHeaderTitle("Quản lý lớp học");
    setHeaderActions([
      {
        title: "Tạo",
        icon: "pi pi-plus",
        onClick: () => {
          navigate("/class/create");
        },
        type: "button",
        disabled: false,
        permission: "class:create",
      },
      {
        title: "Import",
        icon: "pi pi-file-import",
        onClick: async () => {
          handleOpenModal();
        },
        type: "file",
        disabled: false,
        permission: "class:create",
      },
      {
        title: "Export",
        icon: "pi pi-file-export",
        onClick: async () => {
          const data = await fetchClasses({ pagination: false });
          const headerContent = "Danh sách lớp học";
          exportExcel(
            "Danh sách lớp học",
            data.map((item, index) => {
              return {
                ...item,
                index: index + 1,
                createdAt: dayjs(item.createdAt).format("DD/MM/YYYY HH:mm:ss"),
                updatedAt: dayjs(item.updatedAt).format("DD/MM/YYYY HH:mm:ss"),
                major: item?.major?.name,
              };
            }),
            exportClassSchemas,
            headerContent
          );
        },
        type: "button",
        disabled: false,
        permission: "class:view",
      },
    ]);

    return () => {
      resetActions();
    };
  }, [setHeaderTitle, setHeaderActions, resetActions, classes]);

  const handleSearch = (query: Object) => {
    fetchClasses(query);
  };

  const actionTable: IActionTable[] = [
    {
      onClick: (data, options) => {
        onToggle(ModalName.CODE_JOIN_CLASS, {
          content: {
            code: data?.secretKey || "",
          },
          header: "Mã tham gia lớp học",
        });
      },
      tooltip: "Mã tham gia",
      icon: "pi-code",
      severity: "secondary",
    },
    {
      onClick: (data, options) => {
        handleClick(`/class/score/${data.id}`, data);
      },
      tooltip: "Quản lý điểm",
      icon: "pi-box",
      severity: "secondary",
      permission: "student_score:view",
    },
    {
      onClick: (data, options) => {
        handleClick(`/class/score-column-management/${data.id}`, data);
      },
      tooltip: "Quản lý cột điểm",
      icon: "pi-pen-to-square",
      severity: "secondary",
      permission: "score_column:view",
    },
    // {
    //   onClick: (data, options) => {
    //     handleClick(`/class/statistic/${data.id}`, data);
    //   },
    //   tooltip: "Thống kê",
    //   icon: "pi-chart-bar",
    //   severity: "help",
    // },
    {
      onClick: (data, options) => {
        handleClick(`/student/detail/${data.id}`, data);
      },
      tooltip: "Xem danh sách sinh viên",
      icon: "pi-users",
      severity: "info",
    },
    {
      onClick: (data, options) => {
        handleClick(`/class/edit/${data.id}`, data);
      },
      tooltip: "Sửa",
      icon: "pi-pencil",
      severity: "warning",
      permission: "class:update",
    },
    {
      onClick: (data, options) => {
        handleDelete(data.id);
      },
      tooltip: "Xóa",
      icon: "pi-trash",
      severity: "danger",
      permission: "class:delete",
    },
  ];

  return (
    <div>
      <MyTable
        keySearch="name"
        data={classes.map((item, index) => ({
          ...item,
          index: index + 1,
          // teacher: item.teacher?.name,
          major: item?.major?.name,
        }))}
        schemas={classSchemas}
        actions={actionTable}
        totalRecords={total}
        isLoading={isLoadingApi}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Class;
