import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { examSchemas } from "../../dataTable/examTable";
import useConfirm from "../../hooks/useConfirm";
import { useCommonStore } from "../../stores";
import { uploadFile } from "../../utils";
import { useExamStore } from "../../stores/examStore"; // assuming there's an examStore similar to facultyStore
import { useToast } from "../../hooks/useToast";
import { pathNames } from "../../constants";

const Exam = () => {
  const { exams, fetchExams, total, deleteExam } = useExamStore();
  const navigate = useNavigate();
  const { onConfirm } = useConfirm();
  const { showToast } = useToast();
  const { setHeaderTitle, setHeaderActions, resetActions, isLoadingApi } =
    useCommonStore();

  const handleEdit = (data: any) => {
    navigate(`${pathNames.EXAM}/edit/${data.id}`);
  };

  const handleDelete = (id: any) => {
    const confirmData = {
      message: "Bạn có chắc chắn muốn xoá đề thi này?",
      header: "Xác nhận xoá",
      onAccept: async () => {
        const result = await deleteExam(id);
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
        fetchExams({}); // Refresh data after delete
      },
      onReject: () => {},
    };
    onConfirm(confirmData);
  };
  const handleViewScore = (data: any) => {
    navigate(`${pathNames.EXAM}/view/${data.id}`);
  };

  const actionTable: IActionTable[] = [
    {
      onClick: (data) => handleViewScore(data),
      tooltip: "Xem điểm",
      icon: "pi-eye",
      severity: "info",
    },
    {
      onClick: handleEdit,
      tooltip: "Sửa",
      icon: "pi-pencil",
      severity: "warning",
    },
    {
      onClick: (data) => handleDelete(data.id),
      tooltip: "Xóa",
      icon: "pi-trash",
      severity: "danger",
    },
  ];

  useEffect(() => {
    setHeaderTitle("Quản lý Đề thi");
    setHeaderActions([
      {
        title: "Tạo mới",
        icon: "pi pi-plus",
        onClick: () => navigate(`${pathNames.EXAM}/create`),
        type: "button",
        disabled: false,
      },
      {
        title: "Import",
        icon: "pi pi-file-import",
        onClick: async () => {
          const file = await uploadFile();
          // Handle the imported file here
        },
        type: "file",
        disabled: false,
      },
      {
        title: "Export",
        icon: "pi pi-file-export",
        onClick: () => {
          console.log("Export logic");
        },
        type: "button",
        disabled: false,
      },
    ]);

    return () => {
      resetActions();
    };
  }, [navigate, resetActions, setHeaderActions, setHeaderTitle]);

  const handleSearch = (query: any) => {
    fetchExams(query);
  };

  return (
    <div>
      <MyTable
        keySearch="name"
        data={exams}
        schemas={examSchemas}
        actions={actionTable}
        totalRecords={total}
        isLoading={isLoadingApi}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Exam;
