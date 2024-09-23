import { useEffect, useMemo, useRef, useState } from "react";
import { useCommonStore } from "../../stores";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { useNavigate } from "react-router-dom";
import useConfirm from "../../hooks/useConfirm";
import { classes, classSchemas } from "../../dataTable/class";
import { uploadFile } from "../../utils";
import { Menu } from "primereact/menu";

const Class = () => {
  const actionTable: IActionTable[] = [
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
      severity: "success",
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

  const { setHeaderTitle, setHeaderActions, resetActions } = useCommonStore();

  const handleClick = (endpoint: string, data: any) => {
    console.log(data);
    navigate(endpoint);
  };
  const handleDelete = (id: number) => {
    const data = {
      message: "Bạn có chắc chắn muốn xoá lớp học này?",
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
    setHeaderTitle("Quản lý môn học");
    setHeaderActions([
      {
        title: "Tạo",
        icon: "pi pi-plus",
        onClick: () => {
          navigate("/class/create");
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

  return (
    <div>
      <MyTable data={classes} schemas={classSchemas} actions={actionTable} />
    </div>
  );
};

export default Class;
