import { useEffect, useState } from "react";
import { useCommonStore, useModalStore } from "../../stores";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { questions, questionSchemas } from "../../dataTable/questionTable";
import useConfirm from "../../hooks/useConfirm";
import { ModalName, QuestionType } from "../../constants";
import { useQuestionStore } from "../../stores/questionStore";
import { useToast } from "../../hooks/useToast";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

interface IStatus {
  id: string;
  label: string;
}

interface IStatus {
  id: string;
  label: string;
}

const Question = () => {
  const navigate = useNavigate();
  const { onToggle, onDismiss } = useModalStore();
  const { onConfirm } = useConfirm();
  const { setHeaderTitle, setHeaderActions, resetActions } = useCommonStore();
  const { questions, fetchQuestions, total, deleteQuestion } =
    useQuestionStore();
  const { isLoadingApi } = useCommonStore();
  const { showToast } = useToast();
  const handleSubmit = (data: any) => {
    onDismiss();
  };

  const handleEdit = (data: any) => {
    const type =
      data.type === QuestionType.MULTIPLE_CHOICE ? "multiple_choice" : "code";
    navigate(`/question/edit/${data.id}?type=${type}`);
  };

  const handleDelete = (id: number) => {
    const data = {
      message: "Bạn có chắc chắn muốn xoá thông báo này?",
      header: "Xác nhận xoá",
      onAccept: async () => {
        try {
          const result = await deleteQuestion(id);
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
        } catch (error) {
          showToast({
            severity: "danger",
            summary: "Thông báo",
            message: "Xóa thất bại",
            life: 3000,
          });
        }
      },
      onReject: () => {
        console.log("Đã hủy bỏ hành động.");
      },
    };
    onConfirm(data);
  };

  const handleView = (data: any) => {
    console.log(data);
    onToggle(ModalName.VIEW_QUESTION, {
      header: "Chi tiết câu hỏi",
      content: data,
      style: "tw-w-[90%] md:tw-w-[30rem]",
    });
  };

  const actionTable: IActionTable[] = [
    {
      onClick: (data, options) => {
        handleView(data);
      },
      tooltip: "Xem",
      icon: "pi-eye",
      severity: "info",
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

  useEffect(() => {
    setHeaderTitle("Quản lý câu hỏi");
    setHeaderActions([
      {
        title: "Tạo trắc nghiệm",
        icon: "pi pi-plus",
        onClick: () => {
          navigate(`/question/create?type=multiple_choice`);
        },
        type: "button",
        disabled: false,
      },
      {
        title: "Tạo bài tập",
        icon: "pi pi-plus",
        onClick: () => {
          navigate(`/question/create?type=code`);
        },
        type: "button",
        disabled: false,
      },
    ]);
    return () => {
      resetActions();
    };
  }, [setHeaderTitle, setHeaderActions, resetActions]);
  const handleSearch = (query: Object) => {
    fetchQuestions(query);
  };
  const status: IStatus[] = [
    {
      id: "all",
      label: "Tất cả",
    },
    {
      id: "me",
      label: "Của tôi",
    },
  ];
  const [selectedStauts, setselectedStauts] = useState<IStatus>(status[0]);

  useEffect(() => {
    fetchQuestions({ type: selectedStauts?.id });
  }, [selectedStauts]);

  return (
    <div>
      <Dropdown
        value={selectedStauts}
        onChange={(e: DropdownChangeEvent) => setselectedStauts(e.value)}
        options={status}
        optionLabel="label"
        placeholder="Danh sách câu hỏi"
        className="tw-w-1/2 md:tw-w-14rem tw-my-2"
      />
      <MyTable
        keySearch="title"
        data={questions}
        schemas={questionSchemas}
        actions={actionTable}
        totalRecords={total}
        isLoading={isLoadingApi}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Question;
