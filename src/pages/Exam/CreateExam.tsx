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
  const targetRef = useRef<ISource[]>([]); // Reference to store the latest target value

  const setFooterActions = useCommonStore((state) => state.setFooterActions);
  const setHeaderTitle = useCommonStore((state) => state.setHeaderTitle);
  const resetActions = useCommonStore((state) => state.resetActions);
  const { onConfirm } = useConfirm();
  const { isLoadingApi } = useCommonStore();
  const { onToggle } = useModalStore();
  const { questions, fetchQuestions, total } = useQuestionStore();
  const { addExam } = useExamStore();

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

  const [selectQuery, setSelectQuery] = useState<object | null>(null);

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
    loadDataQuestions(selectQuery);
  }, [
    selectedChapters,
    selectedDifficultys,
    selectedMajors,
    selectedQuestionTypes,
  ]);
  const loadDataQuestions = (query: any) => {
    setSelectQuery(query);
    fetchQuestions({
      ...query,
      chapterId: selectedChapters?.id,
      difficultyId: selectedDifficultys?.id,
      majorId: selectedMajors?.id,
      questionType: selectedQuestionTypes?.id,
    });
  };

  const onChange = (event: PickListChangeEvent) => {
    setSource(event.source);
    setTarget(event.target);
    targetRef.current = event.target; // Update targetRef with the latest target
  };

  const handleSubmitCreate = async (data: any) => {
    console.log(target);
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
      const result = await addExam({ ...data, questions });

      if (!result) {
        return showToast({
          severity: "danger",
          summary: "Thông báo",
          message: "Tạo thất bại",
          life: 3000,
        });
      }
      showToast({
        severity: "success",
        summary: "Thông báo",
        message: "Tạo thành công",
        life: 3000,
      });

      navigate(pathNames.EXAM);
    } catch (error) {
      return showToast({
        severity: "danger",
        summary: "Thông báo",
        message: "Tạo thất bại",
        life: 3000,
      });
    }
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
        handleSubmitCreate(transferData);
        return;
      },
      onReject: () => {},
    };
    if (targetRef.current.length === 0) {
      onConfirm(payload);
      return;
    }
    handleSubmitCreate(transferData);
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
              <div>{question.chapter.name}</div>
            </span>
            <span className="tw-flex tw-items-center">
              <i className="pi pi-star text-sm tw-mr-1"></i>
              <div>{getDifficulty(question.difficulty.level)}</div>
            </span>
          </div>
        ),
        detail: question,
      }));

    setSource(filteredSource);
  }, [questions, target]);

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
            isLoading={isLoadingApi}
            onChange={onChange}
            handleOpenModal={handleOpenModal}
          />
        </MyCard>
      </form>
    </div>
  );
};

export default CreateExam;
