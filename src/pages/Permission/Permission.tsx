import { useEffect, useState } from "react";
import { useCommonStore, useModalStore } from "../../stores";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { departmentSchemas, departments } from "../../dataTable/department";
import { useNavigate } from "react-router-dom";
import useConfirm from "../../hooks/useConfirm";
import { uploadFile } from "../../utils";
import { users, userSchemas } from "../../dataTable/user";
import { permissions, permissionSchemas } from "../../dataTable/permission";
import { ModalName } from "../../components/constants";
import { Button } from "primereact/button";
import { PermissionForm } from "../../dataForm/permission";

const Permission = () => {
  const actionTable: IActionTable[] = [
    {
      onClick: (data, options) => {
        handleAssignPermission(data);
      },
      tooltip: "Gán quyền",
      icon: "pi-key",
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
    {
      onClick: (data, options) => {
        handleDelete(data.id);
      },
      tooltip: "Xóa",
      icon: "pi-trash",
      severity: "danger",
    },
  ];
  const { onConfirm } = useConfirm();
  const { onToggle } = useModalStore();
  const navigate = useNavigate();
  const { setHeaderTitle, setHeaderActions, resetActions } = useCommonStore();

  const handleAssignPermission = (data: any) => {
    navigate("/permission/assign/" + data.id);
  };

  const handleEdit = (data: any) => {
    onToggle(ModalName.CREATE_PERMISSION, {
      header: "Tạo quyền",
      content: data,
      style: "tw-w-[90%] md:tw-w-[30rem]",
    });
  };

  const handleDelete = (id: number) => {
    const data = {
      message: "Bạn có chắc chắn muốn xoá quyền này?",
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
    setHeaderTitle("Quản lý phân quyền");
    setHeaderActions([
      {
        title: "Tạo",
        icon: "pi pi-plus",
        onClick: () => {
          onToggle(ModalName.CREATE_PERMISSION, {
            header: "Tạo quyền",
            style: "tw-w-[90%] md:tw-w-[30rem]",
          });
        },
        type: "button",
        disabled: false,
      },
    ]);

    return () => {
      resetActions();
    };
  }, []);

  return (
    <div>
      <MyTable
        data={permissions}
        schemas={permissionSchemas}
        actions={actionTable}
      />
    </div>
  );
};

export default Permission;
