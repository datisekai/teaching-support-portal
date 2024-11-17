import { useEffect, useState } from "react";
import { useCommonStore } from "../../stores";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { facultySchemas, facultys } from "../../dataTable/facultyTable";
import { useNavigate } from "react-router-dom";
import useConfirm from "../../hooks/useConfirm";
import { uploadFile } from "../../utils";
import { users, userSchemas } from "../../dataTable/userTable";
import { useUserStore } from "../../stores/userStore";

const User = () => {
  const actionTable: IActionTable[] = [
    // {
    //   onClick: (data, options) => {
    //     handleReset(data);
    //   },
    //   tooltip: "Khóa",
    //   icon: "pi-lock",
    //   severity: "help",
    // },
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
  const { users, total, fetchUsers } = useUserStore()

  const { setHeaderTitle, setHeaderActions, resetActions, isLoadingApi } = useCommonStore();
  const handleReset = (data: any) => {
    console.log(data);
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
      // {
      //   title: "Tạo",
      //   icon: "pi pi-plus",
      //   onClick: () => {
      //     navigate(`/user/create`);
      //   },
      //   type: "button",
      //   disabled: false,
      // },
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
