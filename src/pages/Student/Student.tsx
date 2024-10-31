import { useEffect, useState } from "react";
import { useCommonStore } from "../../stores";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { useNavigate, useParams } from "react-router-dom";
import useConfirm from "../../hooks/useConfirm";
import { uploadFile } from "../../utils";
import { students, studentSchemas } from "../../dataTable/studentTable";
import { useUserStore } from "../../stores/userStore";
import { userSchemas } from "../../dataTable/userTable";
import { useClassStore } from "../../stores/classStore";
import { useToast } from "../../hooks/useToast";

const Student = () => {
  const { id } = useParams();
  const actionTable: IActionTable[] = [
    {
      onClick: (data, options) => {
        handleReset(data);
      },
      tooltip: "Reset thiết bị",
      icon: "pi-refresh",
      severity: "help",
    },
    // {
    //   onClick: (data, options) => {
    //     handleEdit(data);
    //   },
    //   tooltip: "Sửa",
    //   icon: "pi-pencil",
    //   severity: "warning",
    // },
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
  const { users, fetchUsers, deleteUser, total, resetDevice } = useUserStore();
  const { _class, fetchClass } = useClassStore();
  const { showToast } = useToast();
  const { setHeaderTitle, setHeaderActions, resetActions, isLoadingApi } =
    useCommonStore();

  // const handleEdit = (data: any) => {
  //   navigate(`/student/edit/${data.id}`);
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
  };

  const handleDelete = (id: number) => {
    const data = {
      message: "Bạn có chắc chắn muốn xoá sinh viên này?",
      header: "Xác nhận xoá",
      onAccept: () => {
        console.log("Đã xoá thành công!", id);
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
        onClick: async () => {
          const file = await uploadFile();
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
  }, []);
  const handleSearch = (query: Object) => {
    // fetchUsers(query);
    // fetchClasses();
  };
  return (
    <div>
      <MyTable
        keySearch="name"
        data={_class.users}
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
