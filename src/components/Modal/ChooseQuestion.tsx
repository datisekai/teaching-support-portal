import React, { useEffect, useMemo, useState } from "react";
import { useQuestionStore } from "../../stores/questionStore";
import { Button } from "primereact/button";
import { useModalStore } from "../../stores";
import { useClassStore } from "../../stores/classStore";
import { IQuestion } from "../../types/question";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { useChapterStore } from "../../stores/chapterStore";
import { useDifficultyStore } from "../../stores/difficultStore";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { getQuestionTypeText } from "../../utils";

const questionTypes = [
  {
    value: "multiple_choice",
    label: "Trắc nghiệm",
  },
  {
    value: "code",
    label: "Bài tập",
  },
];

const ChooseQuestion = () => {
  const { content, onDismiss } = useModalStore();
  const { classesUnlimited } = useClassStore();
  const { fetchChapters, chapters } = useChapterStore();
  const { difficultys } = useDifficultyStore();

  const { questions, fetchQuestions, total } = useQuestionStore();
  const [previewQuestions, setPreviewQuestions] = useState<IQuestion[]>([]);
  const [filter, setFilter] = useState<any>({
    chapterId: "",
    difficultyId: "",
    questionType: "",
    page: 1,
  });

  const major = useMemo(() => {
    return classesUnlimited.find((item) => item.id === +content.classId)?.major;
  }, [content, classesUnlimited]);

  console.log("major", major);
  console.log("classId", content.classId);
  console.log("classesUnlimited", classesUnlimited);

  useEffect(() => {
    if (major) {
      fetchChapters({ majorId: major?.id });
    }
  }, [major]);

  useEffect(() => {
    if (major) {
      fetchQuestions({ ...filter, majorId: major?.id });
    }
  }, [filter, major]);

  const handlePageChange = (event: PaginatorPageChangeEvent) => {
    const page = Math.max(1, event.page + 1);
    setFilter({ ...filter, page });
  };

  const handleAdd = async () => {
    if (content?.onApply && typeof content.onApply === "function") {
      content.onApply(previewQuestions);
    }
    onDismiss();
  };

  return (
    <div className="tw-space-y-4">
      <div className={"tw-flex tw-items-end tw-gap-4 tw-flex-wrap"}>
        <div>
          <div className={"mb-1"}>Lọc theo chương</div>
          <Dropdown
            optionLabel="name"
            placeholder="Chọn chương"
            className="w-full"
            options={chapters}
            optionValue="id"
            value={filter.chapterId}
            onChange={(e) => setFilter({ ...filter, chapterId: e.value })}
          />
        </div>

        <div>
          <div className={"mb-1"}>Lọc theo độ khó</div>
          <Dropdown
            optionLabel="level"
            placeholder="Chọn độ khó"
            className="w-full"
            options={difficultys}
            optionValue="id"
            value={filter.difficultyId}
            onChange={(e) => setFilter({ ...filter, difficultyId: e.value })}
          />
        </div>
        <div>
          <div className={"mb-1"}>Lọc theo loại câu hỏi</div>
          <Dropdown
            optionLabel="label"
            placeholder="Chọn độ khó"
            className="w-full"
            options={questionTypes}
            optionValue="value"
            value={filter.questionType}
            onChange={(e) => setFilter({ ...filter, questionType: e.value })}
          />
        </div>

        <div>
          <div className={"mb-1"}>Thao tác</div>
          <div className={"tw-flex tw-gap-2"}>
            <Button
              severity={"contrast"}
              icon={"pi pi-refresh"}
              iconPos={"right"}
              label={"Reset"}
              onClick={() =>
                setFilter({
                  chapterId: "",
                  difficultyId: "",
                  page: 1,
                  questionType: "",
                })
              }
            ></Button>
          </div>
        </div>
      </div>
      <div className="tw-space-y-2">
        {questions?.map((item, index) => (
          <div
            key={item.id}
            className={`tw-cursor-pointer tw-border tw-shadow-sm tw-px-4 tw-py-2 tw-rounded tw-flex tw-justify-between tw-items-center tw-w-full ${
              previewQuestions.some((p) => p.id === item.id)
                ? "border-primary tw-bg-gray-50"
                : ""
            }`}
            onClick={() => {
              const isExisted = previewQuestions.some((p) => p.id === item.id);
              if (isExisted) {
                setPreviewQuestions(
                  previewQuestions.filter((p) => p.id !== item.id)
                );
              } else {
                setPreviewQuestions([...previewQuestions, item]);
              }
            }}
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
                  <span className="text-primary">{item.difficulty.level}</span>
                </p>
                <p>
                  Loại:{" "}
                  <span className="text-primary">
                    {getQuestionTypeText(item.type)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
        {questions?.length == 0 && (
          <div className="tw-text-center tw-my-8">Không có câu hỏi nào.</div>
        )}
      </div>

      <div className="tw-flex tw-items-center tw-justify-between">
        <div>
          Đã chọn:{" "}
          <span className="text-primary tw-font-bold">
            {previewQuestions.length}
          </span>
        </div>
        <Paginator
          first={filter.page}
          rows={10}
          totalRecords={total}
          onPageChange={handlePageChange}
        />
      </div>
      <div className="tw-flex tw-justify-end tw-mt-4">
        <Button
          onClick={handleAdd}
          label="Thêm câu hỏi"
          icon="pi pi-plus"
        ></Button>
      </div>
    </div>
  );
};

export default ChooseQuestion;
