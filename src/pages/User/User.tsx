import { useEffect, useState } from "react";
import { useCommonStore } from "../../stores";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { facultySchemas, facultys } from "../../dataTable/facultyTable";
import { useNavigate } from "react-router-dom";
import useConfirm from "../../hooks/useConfirm";
import { uploadFile } from "../../utils";
import { users, userSchemas } from "../../dataTable/userTable";
import { useUserStore } from "../../stores/userStore";
import { useToast } from "../../hooks/useToast";

const User = () => {
  const actionTable: IActionTable[] = [
    {
      onClick: (data, options) => {
        handleLock(data);
      },
      tooltip: "Khóa",
      icon: "pi-lock",
      severity: "help",
    },
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
        handleEdit(data);
      },
      tooltip: "Sửa",
      icon: "pi-pencil",
      severity: "warning",
    },
    // {
    //   onClick: (data, options) => {
    //     handleDelete(data.id);
    //   },
    //   tooltip: "Xóa",
    //   icon: "pi-trash",
    //   severity: "danger",
    // },
  ];
  const navigate = useNavigate();
  const { onConfirm } = useConfirm();
  const { users, total, fetchUsers, resetDevice, updateUser } = useUserStore();
  const { showToast } = useToast();
  const { setHeaderTitle, setHeaderActions, resetActions, isLoadingApi } =
    useCommonStore();

  const handleLock = async (data: any) => {
    const result = await updateUser(data.id, { active: false });
    if (!result) {
      showToast({
        severity: "danger",
        summary: ",Thông báo",
        message: "Khóa thất bại!",
        life: 3000,
      });
    }
    showToast({
      severity: "success",
      summary: ",Thông báo",
      message: "Khóa thành công!",
      life: 3000,
    });
    fetchUsers({});
  };
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
    fetchUsers({});
  };
  const handleEdit = (data: any) => {
    navigate(`/user/edit/${data.id}`);
  };
  const handleDelete = (id: number) => {
    const data = {
      message: "Bạn có chắc chắn muốn xoá người dùng này?",
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
    setHeaderTitle("Quản lý người dùng");
    setHeaderActions([
      {
        title: "Tạo",
        icon: "pi pi-plus",
        onClick: () => {
          navigate(`/user/create`);
        },
        type: "button",
        disabled: false,
      },
      // {
      //   title: "Import",
      //   icon: "pi pi-file-import",
      //   onClick: async () => {
      //     const file = await uploadFile();
      //   },
      //   type: "file",
      //   disabled: false,
      // },
      // {
      //   title: "Export",
      //   icon: "pi pi-file-export",
      //   onClick: () => {
      //     console.log("a");
      //   },
      //   type: "button",
      //   disabled: false,
      // },
    ]);

    return () => {
      resetActions();
    };
  }, []);

  return (
    <div>
      <MyTable
        keySearch="code"
        data={users.map((item, index) => ({
          ...item,
          index: index + 1,
        }))}
        schemas={userSchemas}
        actions={actionTable}
        totalRecords={total}
        isLoading={isLoadingApi}
        onChange={(query) => fetchUsers(query)}
      />
    </div>
  );
};

export default User;
