import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import GroupItem from "../../components/Form/GroupItem";
import MyCard from "../../components/UI/MyCard";
import { pathNames, QuestionType } from "../../constants";
import {
  QuestionCodeForm,
  QuestionCodeHtmlForm,
  QuestionMultiChoiceForm,
} from "../../dataForm/questionForm";
import { useQuery } from "../../hooks/useQuery";
import { useCommonStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { useToast } from "../../hooks/useToast";
import { useQuestionStore } from "../../stores/questionStore";
import InitCode from "./components/InitCode";
import MyHtmlCodeEditor from "../../components/UI/MyHtmlCodeEditor";
import { defaultHtmlCode } from "../../constants/html";
import MyLoading from "../../components/UI/MyLoading";

interface IAnswer {
  text: string;
  isCorrect: boolean;
}

// Schema validation
const schema = yup
  .object({
    title: yup.string().required("Tiêu đề là bắt buộc."),
    content: yup.string().required("Nội dung câu hỏi là bắt buộc."),
    isPublic: yup.boolean(),
    majorId: yup.string().required("Môn học là bắt buộc."),
    chapterId: yup.string().required("Chương là bắt buộc."),
    difficultyId: yup.string().required("Độ khó là bắt buộc."),
    acceptedLanguages: yup.array().required("Ngôn ngữ thực hiện là bắt buộc."),
    initCode: yup.object(),
    choices: yup.array().required("Đáp án là bắt buộc."),
  })
  .required();

const EditQuestion = () => {
  const [questionType] = useQuery({
    key: "type",
    defaultValue: QuestionType.MULTIPLE_CHOICE,
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const { isLoadingApi } = useCommonStore();
  const [testcases, setTestCases] = useState([
    { input: "", expectedOutput: "" },
  ]);

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      content: "",
      isPublic: false,
      majorId: "",
      chapterId: "",
      difficultyId: "",
      acceptedLanguages: [],
      initCode: {},
      choices: [],
    },
  });

  const { setFooterActions, setHeaderTitle, resetActions } = useCommonStore(
    (state) => ({
      setFooterActions: state.setFooterActions,
      setHeaderTitle: state.setHeaderTitle,
      resetActions: state.resetActions,
    })
  );

  const { showToast } = useToast();
  const { question, fetchQuestion, updateQuestion } = useQuestionStore();

  useEffect(() => {
    if (id) fetchQuestion(id);
  }, [id, fetchQuestion]);

  useEffect(() => {
    if (question) {
      setValue("title", question.title);
      setValue("content", question.content);
      setValue("isPublic", question.isPublic);
      setValue("majorId", question.major.id);
      setValue("chapterId", question.chapter.id);
      setValue("difficultyId", question.difficulty.id);
      setAnswers(question.choices || []);
    }
  }, [question, setValue]);

  const onSubmit = async (data: any) => {
    if (questionType === QuestionType.MULTIPLE_CHOICE) {
      if (answers.some((answer) => !answer.text.trim())) {
        return showToast({
          message: "Vui lòng nhập tất cả các trường đáp án.",
          summary: "Thông báo",
          severity: "info",
        });
      }
      if (!answers.some((answer) => answer.isCorrect)) {
        return showToast({
          message: "Vui lòng chọn ít nhất 1 đáp án đúng.",
          summary: "Thông báo",
          severity: "info",
        });
      }
    }

    const payload = { ...data, type: questionType, choices: answers };
    if (questionType === QuestionType.CODE) {
      if (
        testcases.length === 0 ||
        testcases.some((item) => !item.input || !item.expectedOutput)
      ) {
        return showToast({
          message: "Vui lòng nhập test case hợp lệ",
          summary: "Thông báo",
          severity: "info",
        });
      }
      payload["testCases"] = testcases;
    }

    const result = await updateQuestion(question.id, payload);
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
    navigate(pathNames.QUESTION);
  };

  const handleSetValue = (
    index: number,
    value: any,
    key: "text" | "isCorrect"
  ) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      if (key === "isCorrect") {
        newAnswers.forEach((ans, idx) => (ans.isCorrect = idx === index));
      } else {
        newAnswers[index].text = value;
      }
      return newAnswers;
    });
  };

  const handleChangeTestCase = (
    key: "input" | "expectedOutput",
    value: any,
    index: number
  ) => {
    setTestCases((prev) => {
      const newTestcases = [...prev];
      newTestcases[index][key] = value;
      return newTestcases;
    });
  };
  const initCode: any = watch("initCode");
  const languages = watch("acceptedLanguages") as string[];

  useEffect(() => {
    const actions: IAction[] = [
      { title: "Trở lại", severity: "secondary", action: "back" },
      {
        onClick: handleSubmit(onSubmit),
        title: "Lưu thay đổi",
        icon: "pi-save",
        permission: "question:update",
      },
    ];

    if (question) {
      setFooterActions(actions);
      setHeaderTitle("Chỉnh sửa câu hỏi");
    }

    return () => resetActions();
  }, [
    handleSubmit,
    setFooterActions,
    setHeaderTitle,
    resetActions,
    question,
    answers,
  ]);

  const QuestionForm = useMemo(() => {
    if (questionType === QuestionType.MULTIPLE_CHOICE) {
      return QuestionMultiChoiceForm;
    }
    if (questionType === QuestionType.CODE) {
      return QuestionCodeForm;
    }
    if (questionType === QuestionType.CODE_HTML) {
      return QuestionCodeHtmlForm;
    }
    return QuestionMultiChoiceForm;
  }, [questionType]);

  return (
    <MyLoading isLoading={isLoadingApi}>
      <div className="tw-space-y-4">
        <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
          {QuestionForm.map((form, index) => (
            <GroupItem
              errors={errors}
              {...form}
              control={control}
              watch={watch}
            />
          ))}
        </form>

        {questionType === QuestionType.MULTIPLE_CHOICE && (
          <MyCard title="Đáp án" className="tw-flex tw-flex-col tw-gap-4">
            {answers.map((answer, index) => (
              <div
                className="tw-flex tw-items-center tw-justify-between tw-gap-2"
                key={index}
              >
                <div className="tw-flex tw-items-center tw-gap-2 tw-w-full">
                  <RadioButton
                    inputId={`answer-${index}`}
                    name="choices"
                    value={answer.text}
                    onChange={() =>
                      handleSetValue(index, answer.text, "isCorrect")
                    }
                    checked={answer.isCorrect}
                  />
                  <InputText
                    placeholder={`Đáp án ${index + 1}`}
                    value={answer.text}
                    onChange={(e) =>
                      handleSetValue(index, e.target.value, "text")
                    }
                    className="tw-w-full"
                  />
                </div>
                <Button
                  icon="pi pi-trash"
                  severity="danger"
                  tooltip="Xóa"
                  tooltipOptions={{ position: "top" }}
                  onClick={() =>
                    setAnswers(answers.filter((_, idx) => idx !== index))
                  }
                />
              </div>
            ))}
            <Button
              text
              className="tw-w-full"
              label="Thêm đáp án"
              onClick={() =>
                setAnswers([...answers, { text: "", isCorrect: false }])
              }
            />
          </MyCard>
        )}

        {questionType === QuestionType.CODE && (
          <>
            <MyCard title="Test case" className="">
              {testcases.map((item, index) => {
                return (
                  <div key={index} className="tw-flex tw-items-center tw-gap-4">
                    <div>
                      <p>Input</p>
                      <InputTextarea
                        value={item.input}
                        onChange={(e) =>
                          handleChangeTestCase("input", e.target.value, index)
                        }
                        rows={5}
                        cols={30}
                      />
                    </div>
                    <div>
                      <p>Kết quả mong đợi</p>
                      <InputTextarea
                        value={item.expectedOutput}
                        onChange={(e) =>
                          handleChangeTestCase(
                            "expectedOutput",
                            e.target.value,
                            index
                          )
                        }
                        rows={5}
                        cols={30}
                      />
                    </div>
                    <Button
                      onClick={() =>
                        setTestCases(testcases.filter((_, i) => i !== index))
                      }
                      icon="pi pi-times"
                      rounded
                      outlined
                      severity="danger"
                      aria-label="Cancel"
                    />
                  </div>
                );
              })}

              <div className="tw-mt-2">
                <Button
                  onClick={() =>
                    setTestCases([
                      ...testcases,
                      { input: "", expectedOutput: "" },
                    ])
                  }
                  icon="pi pi-plus"
                  label="Thêm test case"
                ></Button>
              </div>
            </MyCard>

            <InitCode
              languages={languages}
              setInitCode={(value) => setValue("initCode", value)}
              code={initCode}
              testcases={testcases}
            />
          </>
        )}

        {questionType === QuestionType.CODE_HTML && question && (
          <MyCard title="Code khởi tạo">
            <MyHtmlCodeEditor
              key={question?.id}
              onChange={(value) => setValue("initCode", value)}
              htmlInitialValue={question?.initCode?.html || ""}
              cssInitialValue={question?.initCode?.css || ""}
              jsInitialValue={question?.initCode?.js || ""}
            />
          </MyCard>
        )}
      </div>
    </MyLoading>
  );
};

export default EditQuestion;
