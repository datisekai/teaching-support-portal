import { Button } from "primereact/button";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyCard from "../../components/UI/MyCard";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { ModalName, UserType } from "../../constants";
import { questionSchemas } from "../../dataTable/questionTable";
import useConfirm from "../../hooks/useConfirm";
import { useToast } from "../../hooks/useToast";
import { useCommonStore, useModalStore } from "../../stores";
import { useQuestionStore } from "../../stores/questionStore";
import { useUserStore } from "../../stores/userStore";
import { useMajorStore } from "../../stores/majorStore";
import { set } from "react-hook-form";

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
  const { user } = useUserStore();
  const { fetchMajors, majorsUnlimited } = useMajorStore();

  const [filter, setFilter] = useState({ type: "all", majorId: "" });
  const handleEdit = (data: any) => {
    navigate(`/question/edit/${data.id}?type=${data.type}`);
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
              severity: "error",
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
      onReject: () => {},
    };
    onConfirm(data);
  };

  const handleView = (data: any) => {
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
      isHidden(data) {
        return data.user.id !== user.id && user.type !== UserType.MASTER;
      },
      permission: "question:update",
    },
    {
      onClick: (data, options) => {
        handleDelete(data.id);
      },
      tooltip: "Xóa",
      icon: "pi-trash",
      severity: "danger",
      isHidden(data) {
        return data.user.id !== user.id && user.type !== UserType.MASTER;
      },
      permission: "question:delete",
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
        permission: "question:create",
      },
      {
        title: "Tạo bài tập",
        icon: "pi pi-plus",
        onClick: () => {
          navigate(`/question/create?type=code`);
        },
        type: "button",
        disabled: false,
        permission: "question:create",
      },
      {
        title: "Tạo bài tập HTML",
        icon: "pi pi-plus",
        onClick: () => {
          navigate(`/question/create?type=code_html`);
        },
        type: "button",
        disabled: false,
        permission: "question:create",
      },
    ]);

    fetchMajors({ pagination: false });
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
  // useEffect(() => {
  //   fetchQuestions({ type: selectedStauts?.id });
  // }, [selectedStauts]);

  const applyFilter = () => {
    fetchQuestions(filter);
  };

  const resetFilter = () => {
    fetchQuestions({});
    setFilter({ type: "all", majorId: "" });
  };

  return (
    <div className="tw-space-y-4">
      <MyCard title={"Tìm kiếm"}>
        <div className={"tw-flex tw-items-end tw-gap-4 tw-flex-wrap"}>
          <div>
            <div className={"mb-1"}>Câu hỏi</div>
            <Dropdown
              value={filter.type}
              onChange={(e: DropdownChangeEvent) =>
                setFilter({ ...filter, type: e.value })
              }
              options={status}
              optionValue="id"
              optionLabel="label"
              placeholder="Danh sách câu hỏi"
            />
          </div>

          <div>
            <div className={"mb-1"}>Lọc theo môn</div>
            <Dropdown
              // value={selectedClass}
              // onChange={(e) => setSelectedClass(e.value)}
              value={filter.majorId}
              onChange={(e: DropdownChangeEvent) =>
                setFilter({ ...filter, majorId: e.value })
              }
              options={majorsUnlimited}
              optionLabel="name"
              optionValue="id"
              loading={isLoadingApi}
              placeholder="Chọn môn học"
              className="w-full"
            />
          </div>

          <div>
            <div className={"mb-1"}>Thao tác</div>
            <div className={"tw-flex tw-gap-2"}>
              <Button
                onClick={applyFilter}
                icon={"pi pi-play"}
                iconPos={"right"}
                label={"Áp dụng"}
              ></Button>
              <Button
                onClick={resetFilter}
                severity={"contrast"}
                icon={"pi pi-refresh"}
                iconPos={"right"}
                label={"Reset"}
              ></Button>
            </div>
          </div>
        </div>
      </MyCard>

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
