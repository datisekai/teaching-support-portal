import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import GroupItem from "../../components/Form/GroupItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useCommonStore, useModalStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
import { ExamForm } from "../../dataForm/examForm";
import { PickListChangeEvent } from "primereact/picklist";
import MyPickList, { ISource } from "../../components/UI/MyPickList";
import { questions } from "../../dataTable/questionTable";
import MyCard from "../../components/UI/MyCard";
import { ModalName, pathNames } from "../../constants";
import useConfirm from "../../hooks/useConfirm";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { useToast } from "../../hooks/useToast";
import { useDifficultyStore } from "../../stores/difficultStore";
import { useChapterStore } from "../../stores/chapterStore";
import { useMajorStore } from "../../stores/majorStore";
import { IChapter } from "../../types/chapter";
import { IDifficulty } from "../../types/difficulty";
import { IMajor } from "../../types/major";
import { useExamStore } from "../../stores/examStore";
import { useQuestionStore } from "../../stores/questionStore";
import { getTypeQuestion } from "../../utils";

interface IQuestionType {
  id: string;
  label: string;
}

// Schema validation
const schema = yup
  .object()
  .shape({
    title: yup.string().required("Tiêu đề bài thi là bắt buộc."),
    description: yup.string().required("Mô tả là bắt buộc."),
    classId: yup.string().required("Nhóm lớp là bắt buộc."),
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
    showResult: yup.boolean().required("Loại đề thi là bắt buộc."),
  })
  .required();

const EditExam = () => {
  const { id } = useParams(); // Lấy ID của bài thi từ URL
  const navigate = useNavigate();
  const targetRef = useRef<ISource[]>([]); // Sửa useRef để lưu trữ giá trị target mới nhất

  const setFooterActions = useCommonStore((state) => state.setFooterActions);
  const setHeaderTitle = useCommonStore((state) => state.setHeaderTitle);
  const resetActions = useCommonStore((state) => state.resetActions);
  const { onConfirm } = useConfirm();
  const { onToggle } = useModalStore();
  const { questions, fetchQuestions, total } = useQuestionStore();
  const { updateExam, exam, fetchExam } = useExamStore();

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue, // Sử dụng reset để điền dữ liệu vào form
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      classId: "",
      startTime: undefined,
      endTime: undefined,
      showResult: true,
    },
  });

  useEffect(() => {
    fetchExam(id || "");
  }, []);

  const { chapters, fetchChapters, isLoadingChapters } = useChapterStore();
  const { difficultys, fetchDifficultys, isLoadingDifficultys } =
    useDifficultyStore();
  const { majors, fetchMajors, isLoadingMajors } = useMajorStore();

  const [selectedChapters, setSelectedChapters] = useState<IChapter>(
    {} as IChapter
  );
  const [selectedDifficultys, setSelectedDifficultys] = useState<IDifficulty>(
    {} as IDifficulty
  );
  const [selectedMajors, setSelectedMajors] = useState<IMajor>({} as IMajor);
  const [selectedQuestionTypes, setSelectedQuestionTypes] =
    useState<IQuestionType>({} as IQuestionType);

  const [source, setSource] = useState<ISource[]>([]);

  const [target, setTarget] = useState<ISource[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    fetchChapters({ pagination: false });
    fetchDifficultys({ pagination: false });
    fetchMajors({ pagination: false });
  }, []);

  const handleOpenModal = (data: any) => {
    onToggle(ModalName.VIEW_QUESTION, {
      header: "Chi tiết câu hỏi",
      content: data,
      style: "tw-w-[90%] md:tw-w-[30rem]",
    });
  };

  useEffect(() => {
    loadDataQuestions();
  }, [
    selectedChapters,
    selectedDifficultys,
    selectedMajors,
    selectedQuestionTypes,
  ]);

  const loadDataQuestions = () => {
    fetchQuestions({
      chapterId: selectedChapters?.id,
      difficultyId: selectedDifficultys?.id,
      majorId: selectedMajors?.id,
      questionType: selectedQuestionTypes?.id,
    });
  };
  const onChange = (event: PickListChangeEvent) => {
    setSource(event.source);
    setTarget(event.target);
    targetRef.current = event.target; // Cập nhật giá trị của targetRef với giá trị mới nhất của target
  };

  const handleSubmitUpdate = async (data: any) => {
    let sumScore = 0;
    try {
      const questions = target.map((item: any) => {
        sumScore += item.score;
        return {
          questionId: item.id,
          score: item.score,
        };
      });
      if (sumScore !== 10) {
        return showToast({
          severity: "danger",
          summary: "Thông báo",
          message: "Tổng điểm phải bằng 10",
          life: 3000,
        });
      }
      const result = await updateExam(parseInt(id || ""), {
        ...data,
        questions,
      });

      if (!result) {
        return showToast({
          severity: "danger",
          summary: "Thông báo",
          message: "Sửa thất bại",
          life: 3000,
        });
      }
      showToast({
        severity: "success",
        summary: "Thông báo",
        message: "Sửa thành công",
        life: 3000,
      });

      navigate(pathNames.EXAM);
    } catch (error) {
      return showToast({
        severity: "danger",
        summary: "Thông báo",
        message: "Sửa thất bại",
        life: 3000,
      });
    }
  };

  const onSubmit = (data: any) => {
    // Xử lý logic lưu trữ dữ liệu
    const transferData = {
      ...data,
      classId: Number(data.classId),
    };
    const payload = {
      message: "Bạn có chắc chắn muốn cập nhật khi chưa thêm câu hỏi?",
      header: "Xác nhận cập nhật",
      onAccept: () => {
        handleSubmitUpdate(transferData);
        return;
      },
      onReject: () => {
        console.log("Đã hủy bỏ hành động.");
      },
    };

    if (targetRef.current.length === 0) {
      onConfirm(payload);
      return;
    }
    handleSubmitUpdate(transferData);
  };

  useEffect(() => {
    // Exclude questions already in target from source
    const filteredSource = questions
      .filter(
        (question) =>
          !target.some((targetQuestion) => targetQuestion.id === question.id)
      )
      .map((question) => ({
        id: question.id,
        content: question.title,
        subcontent: (
          <div className="tw-flex tw-items-center tw-space-x-4">
            <span className="tw-flex tw-items-center">
              <i className="pi pi-bookmark text-sm tw-mr-1"></i>
              <div>{getTypeQuestion(question.type)}</div>
            </span>
            <span className="tw-flex tw-items-center">
              <i className="pi pi-star text-sm tw-mr-1"></i>
              <div>{question.isPublic ? "Công khai" : "Riêng tư"}</div>
            </span>
          </div>
        ),
        detail: question,
      }));

    setSource(filteredSource);
  }, [questions, target]);

  useEffect(() => {
    if (exam) {
      if (questions) {
        const dataTarget = exam?.examQuestions
          ?.map((question) => {
            const foundQuestion = questions.find(
              (item: any) => item.id === question.question.id
            );
            return foundQuestion
              ? { ...foundQuestion, score: question.score }
              : null;
          })
          .filter(Boolean);

        setTarget(dataTarget || []);
      }
      setValue("title", exam.title);
      setValue("classId", exam?.class?.id.toString());
      setValue("description", exam.description);
      setValue("startTime", new Date(exam.startTime));
      setValue("endTime", new Date(exam.endTime));
      setValue("showResult", exam.showResult);
    }
  }, [exam, questions]);

  useEffect(() => {
    const actions: IAction[] = [
      {
        title: "Trở lại",
        severity: "secondary",
        action: "back",
      },
      {
        onClick: handleSubmit(onSubmit),
        title: "Cập nhật",
        icon: "pi-save",
      },
    ];
    setFooterActions(actions);
    setHeaderTitle("Chỉnh sửa bài thi");

    return () => {
      resetActions();
    };
  }, [handleSubmit, setFooterActions, setHeaderTitle, resetActions, target]);
  const questionType: IQuestionType[] = [
    {
      id: "",
      label: "Tất cả",
    },
    {
      id: "multiple_choice",
      label: "Trắc nghiệm",
    },
    {
      id: "code",
      label: "Tự luận",
    },
  ];
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
        {ExamForm.map((form, index) => (
          <GroupItem errors={errors} {...form} key={index} control={control} />
        ))}
        <div className="tw-flex tw-justify-between tw-items-center">
          <Dropdown
            value={selectedQuestionTypes}
            onChange={(e: DropdownChangeEvent) =>
              setSelectedQuestionTypes(e.value)
            }
            options={questionType}
            optionLabel="label"
            placeholder="Loại câu hỏi"
            className="tw-w-1/2 md:tw-w-14rem tw-my-2"
          />
          <Dropdown
            loading={isLoadingChapters}
            value={selectedChapters}
            onChange={(e: DropdownChangeEvent) => setSelectedChapters(e.value)}
            options={[{ id: "", name: "Tất cả" }, ...chapters]}
            optionLabel="name"
            placeholder="Chương"
            className="tw-w-1/2 md:tw-w-14rem tw-my-2"
          />
          <Dropdown
            loading={isLoadingDifficultys}
            value={selectedDifficultys}
            onChange={(e: DropdownChangeEvent) =>
              setSelectedDifficultys(e.value)
            }
            options={[{ id: "", level: "Tất cả" }, ...difficultys]}
            optionLabel="level"
            placeholder="Độ khó"
            className="tw-w-1/2 md:tw-w-14rem tw-my-2"
          />
          <Dropdown
            loading={isLoadingMajors}
            value={selectedMajors}
            onChange={(e: DropdownChangeEvent) => setSelectedMajors(e.value)}
            options={[{ id: "", name: "Tất cả" }, ...majors]}
            optionLabel="name"
            placeholder="Loại câu hỏi"
            className="tw-w-1/2 md:tw-w-14rem tw-my-2"
          />
        </div>
        <MyCard title="Danh sách câu hỏi">
          <MyPickList
            keySearch="title"
            onChangeLoadData={loadDataQuestions}
            source={source}
            target={target}
            totalRecords={total}
            onChange={onChange}
            handleOpenModal={handleOpenModal}
          />
        </MyCard>
      </form>
    </div>
  );
};

export default EditExam;
