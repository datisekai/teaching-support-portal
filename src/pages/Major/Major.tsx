import { useEffect, useState } from "react";
import { useCommonStore, useModalStore } from "../../stores";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { useNavigate } from "react-router-dom";
import useConfirm from "../../hooks/useConfirm";
import { majorSchemas } from "../../dataTable/majorTable";
import { uploadFile } from "../../utils";
import { ModalName, pathNames } from "../../constants";
import { useMajorStore } from "../../stores/majorStore";
import { teachers } from "../../dataTable/teacherTable"; // Import teachers
import { useToast } from "../../hooks/useToast";

const Major = () => {
  const { onToggle } = useModalStore();

  const actionTable: IActionTable[] = [
    {
      onClick: (data, options) => {
        const transferData = teachers.map((item) => {
          return { content: item.code, subcontent: item.name };
        });
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
      tooltip: "Sửa",
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
  const { showToast } = useToast();
  const { setHeaderTitle, setHeaderActions, resetActions, isLoadingApi } =
    useCommonStore();
  const { majors, total, deleteMajor, fetchMajors } = useMajorStore();

  const handleEdit = (data: any) => {
    navigate(`${pathNames.MAJOR}/edit/${data.id}`);
  };

  const handleDelete = (id: number) => {
    const data = {
      message: "Bạn có chắc chắn muốn xoá môn học này?",
      header: "Xác nhận xoá",
      onAccept: () => {
        const result = deleteMajor(id);
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
          navigate(`${pathNames.MAJOR}/create`);
        },
        type: "button",
        disabled: false,
      },
      {
        title: "Import",
        icon: "pi pi-file-import",
        onClick: async () => {
          const file = await uploadFile();
          console.log("File imported:", file);
        },
        type: "file",
        disabled: false,
      },
      {
        title: "Export",
        icon: "pi pi-file-export",
        onClick: () => {
          console.log("Export functionality here");
        },
        type: "button",
        disabled: false,
      },
    ]);

    return () => {
      resetActions();
    };
  }, [navigate, resetActions, setHeaderActions, setHeaderTitle]);

  const handleSearch = (query: Object) => {
    fetchMajors(query);
  };

  return (
    <div>
      <MyTable
        keySearch="name"
        data={majors.map((item) => ({
          ...item,
          faculty: item.faculty.name,
        }))}
        schemas={majorSchemas}
        actions={actionTable}
        totalRecords={total}
        isLoading={isLoadingApi}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Major;
