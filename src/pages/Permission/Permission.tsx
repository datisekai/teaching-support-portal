import { useEffect, useState } from "react";
import { useCommonStore, useModalStore, useRoleStore } from "../../stores";
import MyTable, {
  IActionTable,
  QueryParams,
} from "../../components/UI/MyTable";
import { useNavigate } from "react-router-dom";
import useConfirm from "../../hooks/useConfirm";
import { permissionSchemas } from "../../dataTable/permissionTable";
import { ModalName } from "../../constants";
import { useToast } from "../../hooks/useToast";

const Permission = () => {
  const { clearContent } = useModalStore();
  const { showToast } = useToast();
  const actionTable: IActionTable[] = [
    {
      onClick: (data, options) => {
        handleAssignPermission(data);
      },
      tooltip: "Gán quyền",
      icon: "pi-key",
      severity: "help",
      permission: "user:update",
    },
    {
      onClick: (data, options) => {
        handleEdit(data);
      },
      tooltip: "Sửa",
      icon: "pi-pencil",
      severity: "warning",
      permission: "user:update",
    },
    {
      onClick: (data, options) => {
        handleDelete(data.id);
      },
      tooltip: "Xóa",
      icon: "pi-trash",
      severity: "danger",
      permission: "user:update",
    },
  ];
  const { onConfirm } = useConfirm();
  const { onToggle } = useModalStore();
  const navigate = useNavigate();
  const { setHeaderTitle, setHeaderActions, resetActions, isLoadingApi } =
    useCommonStore();
  const { roles, total, fetchRoles, deleteRole } = useRoleStore();

  const handleAssignPermission = (data: any) => {
    navigate("/permission/assign/" + data.id);
  };

  const handleEdit = (data: any) => {
    onToggle(ModalName.CREATE_PERMISSION, {
      header: "Sửa quyền",
      content: data,
      style: "tw-w-[90%] md:tw-w-[24rem]",
    });
  };

  const handleDelete = (id: number) => {
    const data = {
      message: "Bạn có chắc chắn muốn xoá quyền này?",
      header: "Xác nhận xoá",
      onAccept: () => {
        const result = deleteRole(id);
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
    setHeaderTitle("Quản lý phân quyền");
    setHeaderActions([
      {
        title: "Tạo",
        icon: "pi pi-plus",
        onClick: () => {
          clearContent();
          onToggle(ModalName.CREATE_PERMISSION, {
            header: "Tạo quyền",
            style: "tw-w-[90%] md:tw-w-[24rem]",
          });
        },
        type: "button",
        disabled: false,
        permission: "user:update",
      },
    ]);

    fetchRoles({});
    return () => {
      resetActions();
    };
  }, []);

  const handleSearch = (query: Object) => {
    fetchRoles(query);
  };

  return (
    <div>
      <MyTable
        keySearch="name"
        data={roles}
        schemas={permissionSchemas}
        actions={actionTable}
        totalRecords={total}
        isLoading={isLoadingApi}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Permission;
