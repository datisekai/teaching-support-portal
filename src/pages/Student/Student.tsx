import { useEffect, useState } from "react";
import { useCommonStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
import MyTable from "../../components/UI/MyTable";
import { useNavigate, useParams } from "react-router-dom";
import useConfirm from "../../hooks/useConfirm";
import { uploadFile } from "../../utils";
import { students, studentSchemas } from "../../dataTable/student";

const Student = () => {
  const { id } = useParams();
  const [actionTable, setActionTable] = useState<IAction[]>([]);
  const navigate = useNavigate();
  const { onConfirm } = useConfirm();

  const { setHeaderTitle, setHeaderActions, resetActions } = useCommonStore();

  const handleEdit = (id: number) => {
    navigate(`/student/edit/${id}`);
  };
  const handleReset = (id: number) => {
    navigate(-1);
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
    setActionTable([
      {
        onClick: () => handleReset(1),
        tooltip: "Reset thiết bị",
        icon: "pi-refresh",
        severity: "help",
      },
      {
        onClick: () => handleEdit(1),
        tooltip: "Sửa",
        icon: "pi-pencil",
        severity: "success",
      },
      {
        onClick: () => handleDelete(1),
        tooltip: "Xóa",
        icon: "pi-trash",
        severity: "danger",
      },
    ]);
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

  return (
    <div>
      <MyTable data={students} schemas={studentSchemas} actions={actionTable} />
    </div>
  );
};

export default Student;
