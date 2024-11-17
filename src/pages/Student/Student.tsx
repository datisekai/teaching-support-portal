import { useEffect, useMemo, useState } from "react";
import { useCommonStore, useModalStore } from "../../stores";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { useNavigate, useParams } from "react-router-dom";
import useConfirm from "../../hooks/useConfirm";
import { uploadFile } from "../../utils";
import { students, studentSchemas } from "../../dataTable/studentTable";
import { useUserStore } from "../../stores/userStore";
import { userSchemas } from "../../dataTable/userTable";
import { useClassStore } from "../../stores/classStore";
import { useToast } from "../../hooks/useToast";
import { ModalName } from "../../constants";
import ExcelJS from "exceljs";
import { set } from "react-hook-form";
import { Button } from "primereact/button";
import { saveAs } from "file-saver";

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
    {
      onClick: (data, options) => {
        handleReset(data);
      },
      tooltip: "Reset thiết bị",
      icon: "pi-refresh",
      severity: "help",
    },
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
    fetchClass,
    getStudentClass,
    students,
    deleteStudentClass,
    importUsers,
  } = useClassStore();
  console.log("checked", students);
  const { showToast } = useToast();
  const { setHeaderTitle, setHeaderActions, resetActions, isLoadingApi } =
    useCommonStore();
  const { onToggle } = useModalStore();
  const [dataImports, setDataImports] = useState<any[]>([]);
  const { onDismiss } = useModalStore();
  const { setContent, setFooter } = useModalStore();
  const [isLoading, setIsLoading] = useState(false);

  // const handleEdit = (data: any) => {
  //   navigate(`/student/edit/${data.id}`);
  // };

  // const handleDeleteRow = (dataRow: any) => {
  //   setDataImports((prev) => prev.filter((item) => item.code !== dataRow.code));
  // };
  const handleReset = async (data: any) => {
    const result = await resetDevice(data.id);
    if (!result) {
      showToast({
        severity: "danger",
        summary: "Thông báo",
        message: "Cập nhật thất bại!",
        life: 3000,
      });
    }
    showToast({
      severity: "success",
      summary: "Thông báo",
      message: "Cập nhật thành công!",
      life: 3000,
    });
    getStudentClass(id as string, {});
  };
  useEffect(() => {
    if (dataImports.length > 0) {
      setContent(
        <MyTable
          keySearch="name"
          data={dataImports.map((item, index) => ({
            ...item,
            index: index + 1,
          }))}
          schemas={userSchemas}
          isLoading={isLoading}
          // actions={actionTableIport}
          totalRecords={total}
          onChange={handleSearch}
        />
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

  // Function to merge arrays
  const mergeArrays = (existingArray: any[], newArray: any[]) => {
    const result = [...existingArray];

    newArray.forEach((newItem) => {
      // Check if the `code` already exists in the existing array
      const existingIndex = result.findIndex(
        (item) => item.code === newItem.code.toString()
      );

      if (existingIndex > -1) {
        // Update the existing record
        result[existingIndex] = {
          ...result[existingIndex],
          name: newItem.name || result[existingIndex].name,
          email: newItem.email || result[existingIndex].email,
          phone: newItem.phone || result[existingIndex].phone,
          updatedAt: new Date().toISOString(), // Update timestamp
        };
      } else {
        // Add new record to the result
        result.push({
          id: result.length + 1, // Assign new ID
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          code: newItem.code.toString(),
          name: newItem.name || null,
          email: newItem.email || null,
          phone: newItem.phone || null,
          avatar: null,
          deviceUid: null,
          active: true,
          type: "student",
        });
      }
    });

    return result;
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
      onAccept: () => {
        deleteStudentClass(id as string, studentCode);
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
        <MyTable
          keySearch="name"
          data={dataImports.map((item, index) => ({
            ...item,
            index: index + 1,
          }))}
          schemas={userSchemas}
          isLoading={isLoading}
          // actions={actionTableIport}
          totalRecords={total}
          onChange={handleSearch}
        />
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
        onClick: () => {
          console.log("a");
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
    getStudentClass(id || "", query);
  };
  return (
    <div>
      <MyTable
        keySearch="name"
        data={students.map((item, index) => ({
          ...item,
          index: index + 1,
        }))}
        schemas={userSchemas}
        actions={actionTable}
        totalRecords={total}
        isLoading={isLoadingApi}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Student;
