import { useEffect, useState } from "react";
import { useCommonStore, useModalStore } from "../../stores";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { useNavigate } from "react-router-dom";
import useConfirm from "../../hooks/useConfirm";
import { majors, majorSchemas } from "../../dataTable/major";
import { uploadFile } from "../../utils";
import { Button } from "primereact/button";
import { teachers } from "../../dataTable/teacher";
import { ModalName } from "../../constants";

const Major = () => {
  const { onToggle } = useModalStore();

  const actionTable: IActionTable[] = [
    {
      onClick: (data, options) => {
        const transferData = teachers.map((item) => {
          return { content: item.code, subcontent: item.name };
        });
        console.log({ id: data.id, contents: transferData });
        onToggle(ModalName.ADD_TEACHER, {
          header: "Thêm giảng viên",
          content: { id: data.id, contents: transferData },
          style: "tw-w-[90%] md:tw-w-[30rem]",
        });
      },
      tooltip: "Thêm giảng viên",
      icon: "pi-user-plus",
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
  const navigate = useNavigate();
  const { onConfirm } = useConfirm();

  const { setHeaderTitle, setHeaderActions, resetActions } = useCommonStore();

  const handleEdit = (data: any) => {
    navigate(`/major/edit/${data.id}`);
  };
  const handleDelete = (id: number) => {
    const data = {
      message: "Bạn có chắc chắn muốn xoá môn học này?",
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
          navigate("/major/create");
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
      <MyTable data={majors} schemas={majorSchemas} actions={actionTable} />
    </div>
  );
};

export default Major;
