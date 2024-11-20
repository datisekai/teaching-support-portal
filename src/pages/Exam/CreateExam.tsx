import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import GroupItem from "../../components/Form/GroupItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { set, useForm } from "react-hook-form";
import { useCommonStore, useModalStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
import { ExamForm } from "../../dataForm/examForm";
import { PickListChangeEvent } from "primereact/picklist";
import MyPickList, { ISource } from "../../components/UI/MyPickList";
import { questions } from "../../dataTable/questionTable";
import MyCard from "../../components/UI/MyCard";
import { ModalName, pathNames } from "../../constants";
import useConfirm from "../../hooks/useConfirm";
import { useQuestionStore } from "../../stores/questionStore";
import { getDifficulty, getTypeQuestion } from "../../utils";
import { useToast } from "../../hooks/useToast";
import { useExamStore } from "../../stores/examStore";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { useChapterStore } from "../../stores/chapterStore";
import { useDifficultyStore } from "../../stores/difficultStore";
import { useMajorStore } from "../../stores/majorStore";
import { IChapter } from "../../types/chapter";
import { IDifficulty } from "../../types/difficulty";
import { IMajor } from "../../types/major";
import { Button } from "primereact/button";
import { useClassStore } from "../../stores/classStore";
import { IQuestion } from "../../types/question";

interface IQuestionType {
  id: string;
  label: string;
}

const schema = yup
  .object()
  .shape({
    title: yup.string().required("Tiêu đề bài thi là bắt buộc."),
    description: yup.string().required("Mô tả bài thi là bắt buộc."),
    startTime: yup.date().nullable().required("Thời gian bắt đầu là bắt buộc."),
    endTime: yup
      .date()
      .nullable()
      .required("Thời gian kết thúc là bắt buộc.")
      .test(
        "is-greater",
        "Thời gian kết thúc phải sau thời gian bắt đầu.",
        function (value) {
          const { startTime } = this.parent;
          return !startTime || !value || value > startTime;
        }
      ),
    classId: yup.string().required("Nhóm lớp là bắt buộc."),
    showResult: yup.boolean().required("Loại đề thi là bắt buộc."),
  })
  .required();

const CreateExam = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      startTime: undefined,
      endTime: undefined,
      classId: "",
      showResult: true,
      description: "",
    },
  });

  const navigate = useNavigate();

  const setFooterActions = useCommonStore((state) => state.setFooterActions);
  const setHeaderTitle = useCommonStore((state) => state.setHeaderTitle);
  const resetActions = useCommonStore((state) => state.resetActions);
  const { onConfirm } = useConfirm();
  const { isLoadingApi } = useCommonStore();
  const { onToggle } = useModalStore();
  const { addExam } = useExamStore();
  const { fetchClasses } = useClassStore();
  const [previewQuestion, setPreviewQuestion] = useState<IQuestion[]>([]);

  const { difficultys, fetchDifficultys, isLoadingDifficultys } =
    useDifficultyStore();

  const { showToast } = useToast();

  useEffect(() => {
    fetchDifficultys({ pagination: false });
    fetchClasses({ pagination: false });
  }, []);

  const handleOpenModal = (data: any) => {
    onToggle(ModalName.VIEW_QUESTION, {
      header: "Chi tiết câu hỏi",
      content: data,
      style: "tw-w-[90%] md:tw-w-[30rem]",
    });
  };

  const onSubmit = (data: any) => {
    const transferData = {
      ...data,
      classId: Number(data.classId),
    };
    const payload = {
      message: "Bạn có chắc chắn muốn tạo khi chưa thêm câu hỏi?",
      header: "Xác nhận tạo",
      onAccept: () => {
        // handleSubmitCreate(transferData);
        return;
      },
      onReject: () => {},
    };
  };

  useEffect(() => {
    const actions: IAction[] = [
      {
        title: "Trở lại",
        severity: "secondary",
        action: "back",
      },
      {
        onClick: handleSubmit(onSubmit),
        title: "Tạo",
        icon: "pi-plus",
      },
    ];
    setFooterActions(actions);
    setHeaderTitle("Tạo bài thi");

    return () => {
      resetActions();
    };
  }, [handleSubmit, setFooterActions, setHeaderTitle, resetActions]);

  const classId = watch("classId");

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
        {ExamForm.map((form, index) => (
          <GroupItem errors={errors} {...form} key={index} control={control} />
        ))}

        <div></div>
        <MyCard
          title="Danh sách câu hỏi"
          tooltip={"Vui lòng chọn lớp học trước"}
        >
          <div className="tw-space-y-2">
            {previewQuestion?.map((item, index) => (
              <div
                key={item.id}
                className="tw-border tw-shadow-sm tw-px-4 tw-py-2 tw-rounded tw-flex tw-justify-between tw-items-center tw-w-full"
              >
                <div>
                  <div className="tw-font-bold tw-line-clamp-1">
                    {index + 1}. {item.title}
                  </div>
                  <div className="tw-flex tw-items-center tw-gap-2">
                    <p>
                      Chương:{" "}
                      <span className="text-primary">{item.chapter.name}</span>
                    </p>
                    <p>
                      Độ khó:{" "}
                      <span className="text-primary">
                        {item.difficulty.level}
                      </span>
                    </p>
                  </div>
                </div>
                <div>
                  <Button
                    onClick={() =>
                      onConfirm({
                        message: "Bạn có chắc chắn muốn xoá câu hỏi này?",
                        onAccept: () => {
                          setPreviewQuestion(
                            previewQuestion.filter((p) => p.id !== item.id)
                          );
                        },
                      })
                    }
                    icon="pi pi-trash"
                    severity="danger"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="tw-flex tw-gap-2 tw-mt-4">
            <Button
              label="Thêm câu hỏi"
              icon="pi pi-plus"
              disabled={!classId}
              onClick={() =>
                onToggle(ModalName.CHOOSE_QUESTION, {
                  header: "Chọn câu hỏi",
                  content: {
                    onApply: (data: IQuestion[]) => {
                      const newQuestion = Array.from(
                        new Map(
                          data.map((item: IQuestion) => [item.id, item])
                        ).values()
                      );
                      setPreviewQuestion(newQuestion as IQuestion[]);
                    },
                    ...getValues(),
                  },
                })
              }
            ></Button>
            <Button
              label="Tự động chọn"
              icon="pi pi-plus"
              disabled={!classId}
              onClick={() =>
                onToggle(ModalName.AUTOFILL_QUESTION, {
                  header: "Tự động chọn câu hỏi",
                  content: {
                    onApply: (data: IQuestion[]) => {
                      const newQuestion = Array.from(
                        new Map(
                          data.map((item: IQuestion) => [item.id, item])
                        ).values()
                      );
                      setPreviewQuestion(newQuestion as IQuestion[]);
                    },
                    ...getValues(),
                  },
                })
              }
            ></Button>
          </div>
        </MyCard>
      </form>
    </div>
  );
};

export default CreateExam;
