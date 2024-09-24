import { useEffect, useState } from "react";
import { useCommonStore, useModalStore } from "../../stores";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { useNavigate } from "react-router-dom";
import useConfirm from "../../hooks/useConfirm";
import { subjects, subjectSchemas } from "../../dataTable/subject";
import { uploadFile } from "../../utils";
import { Button } from "primereact/button";
import { teachers } from "../../dataTable/teacher";

const Subject = () => {
  const { onToggle } = useModalStore();

  const handleAddTeachers = () => {};

  const actionTable: IActionTable[] = [
    {
      onClick: (data, options) => {
        const transferData = teachers.map((item) => {
          return { content: item.code, subcontent: item.name };
        });
        console.log({ id: data.id, contents: transferData });
        onToggle(
          "picklist",
          {
            header: "Thêm giảng viên",
            footer: (
              <div>
                <Button
                  label="Ok"
                  icon="pi pi-check"
                  autoFocus
                  onClick={handleAddTeachers}
                />
              </div>
            ),
            content: { id: data.id, contents: transferData },
          },
          "tw-w-[90%] md:tw-w-[80rem]"
        );
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
    navigate(`/subject/edit/${data.id}`);
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
          navigate("/subject/create");
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
      <MyTable data={subjects} schemas={subjectSchemas} actions={actionTable} />
    </div>
  );
};

export default Subject;
