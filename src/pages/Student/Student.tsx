import { useEffect, useMemo, useState } from "react";
import { useCommonStore, useModalStore } from "../../stores";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { useNavigate, useParams } from "react-router-dom";
import useConfirm from "../../hooks/useConfirm";
import { uploadFile } from "../../utils";
import {
  importStudentSchemas,
  students,
  studentSchemas,
} from "../../dataTable/studentTable";
import { useUserStore } from "../../stores/userStore";
import { userSchemas } from "../../dataTable/userTable";
import { useClassStore } from "../../stores/classStore";
import { useToast } from "../../hooks/useToast";
import { ModalName } from "../../constants";
import ExcelJS from "exceljs";
import { set } from "react-hook-form";
import { Button } from "primereact/button";
import { saveAs } from "file-saver";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { exportExcel } from "../../utils/my-export-excel";
import dayjs from "dayjs";

const Student = () => {
  const { id } = useParams();
  // const actionTableIport: IActionTable[] = [
  //   {
  //     onClick: (data, options) => {
  //       handleDeleteRow(data);
  //     },
  //     tooltip: "Xóa",
  //     icon: "pi-trash",
  //     severity: "success",
  //   },
  // ];
  const actionTable: IActionTable[] = [
    // {
    //   onClick: (data, options) => {
    //     handleReset(data);
    //   },
    //   tooltip: "Reset thiết bị",
    //   icon: "pi-refresh",
    //   severity: "help",
    // },
    {
      onClick: (data, options) => {
        handleDelete(data.code);
      },
      tooltip: "Xóa",
      icon: "pi-trash",
      severity: "danger",
    },
  ];
  const navigate = useNavigate();
  const { onConfirm } = useConfirm();
  const { users, fetchUsers, deleteUser, total, resetDevice } = useUserStore();
  const {
    _class,
    studentsUnlimited,
    fetchClass,
    getStudentClass,
    students,
    importUsers,
    deleteStudentClass,
  } = useClassStore();
  const { showToast } = useToast();
  const { setHeaderTitle, setHeaderActions, resetActions, isLoadingApi } =
    useCommonStore();
  const { onToggle } = useModalStore();
  const [dataImports, setDataImports] = useState<any[]>([]);
  const { onDismiss } = useModalStore();
  const { setContent, setFooter } = useModalStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getStudentClass(id as string, {});
  }, [id]);

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
          {importStudentSchemas.map((col, i) => (
            <Column key={col.prop} field={col.prop} header={col.label} />
          ))}
        </DataTable>
      );
      setFooter(
        <div>
          <a href="/Mau_Danh_Sach_SV.xlsx" download={"Mau_Danh_Sach_SV.xlsx"}>
            <Button label="Download mẫu"></Button>
          </a>
          <Button label="Chọn file import" onClick={handleChooseFile}></Button>
          <Button label="Import" onClick={handleImport}></Button>,
        </div>
      );
    }
  }, [dataImports]);

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
        if (rowNumber > 7) {
          const rowData = {
            index: row.getCell(1)?.value || "",
            code: row.getCell(2)?.value || "",
            name: row.getCell(3)?.value + " " + row.getCell(4)?.value || "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            // classCode: row.getCell(5)?.value || "",
            // className: row.getCell(6)?.value || "",
            // phone: row.getCell(7)?.value || "",
            // email: row.getCell(8)?.value || "",
          };
          data.push(rowData);
        }
      });
      console.log(data);
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

  const handleDelete = (studentCode: string) => {
    const data = {
      message: "Bạn có chắc chắn muốn xoá sinh viên này?",
      header: "Xác nhận xoá",
      onAccept: async () => {
        const result = await deleteStudentClass(id as string, studentCode);
        if (result) {
          return showToast({
            severity: "success",
            summary: "Thông báo",
            message: "Xóa sinh viên thành công",
            life: 3000,
          });
        }
        showToast({
          severity: "error",
          summary: "Thông báo",
          message: "Xóa sinh viên thất bại.",
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
    if (id) {
      fetchClass(id || "");
    }
  }, [id]);
  const handleOpenModal = () => {
    onToggle(ModalName.REVIEW_IMPORT, {
      header: "Import danh sách sinh viên",
      content: (
        <DataTable
          scrollable
          value={dataImports.map((item, index) => ({
            ...item,
            index: index + 1,
          }))}
          tableStyle={{ minWidth: "50rem" }}
        >
          {studentSchemas.map((col, i) => (
            <Column key={col.prop} field={col.prop} header={col.label} />
          ))}
        </DataTable>
      ),
      footer: (
        <div>
          <a href="/Mau_Danh_Sach_SV.xlsx" download={"Mau_Danh_Sach_SV.xlsx"}>
            <Button label="Download mẫu"></Button>
          </a>
          <Button label="Chọn file import" onClick={handleChooseFile}></Button>
          <Button label="Import" onClick={handleImport}></Button>,
        </div>
      ),
      // style: "tw-w-[90%] md:tw-w-[50rem]",
    });
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
    const result = await importUsers(id as string, { users: dataImports });
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
    getStudentClass(id || "", {});
  };

  useEffect(() => {
    setHeaderTitle("Quản lý Sinh viên");
    setHeaderActions([
      {
        title: "Tạo",
        icon: "pi pi-plus",
        onClick: () => {
          navigate(`/student/create/${id}`);
        },
        type: "button",
        disabled: false,
      },
      {
        title: "Import",
        icon: "pi pi-file-import",
        onClick: () => {
          handleOpenModal();
        },
        type: "file",
        disabled: false,
      },
      {
        title: "Export",
        icon: "pi pi-file-export",
        onClick: async () => {
          const dataStudent = await getStudentClass(id || "", {
            pagination: false,
          });
          const headerContent = `Danh sách sinh viên\nLớp ${_class.name}\nMôn học: ${_class.major.name}`;
          exportExcel(
            `Danh sách sinh viên_Lớp ${_class.name}_Môn học: ${_class.major.name}`,
            dataStudent.map((item, index) => {
              return {
                ...item,
                index: index + 1,
                createdAt: dayjs(item.createdAt).format("DD/MM/YYYY HH:mm:ss"),
                updatedAt: dayjs(item.updatedAt).format("DD/MM/YYYY HH:mm:ss"),
              };
            }),
            studentSchemas,
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
  }, [students, setHeaderTitle, setHeaderActions, resetActions]);
  const handleSearch = (query: Object) => {
    // fetchUsers(query);
    // fetchClasses();
    getStudentClass(id || "", {});
  };
  return (
    <div>
      <MyTable
        // keySearch="name"
        data={students.map((item, index) => ({
          ...item,
          index: index + 1,
        }))}
        schemas={userSchemas}
        actions={actionTable}
        // totalRecords={total}
        isLoading={isLoadingApi}
        // onChange={handleSearch}
      />
    </div>
  );
};

export default Student;
