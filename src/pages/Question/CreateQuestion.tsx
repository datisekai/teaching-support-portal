import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { useCallback, useEffect, useMemo, useState } from "react";
import { set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
import { useCommonStore, useLanguageStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
import InitCode from "./components/InitCode";
import { useToast } from "../../hooks/useToast";
import { useQuestionStore } from "../../stores/questionStore";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import MyHtmlCodeEditor from "../../components/UI/MyHtmlCodeEditor";
import { defaultHtmlCode } from "../../constants/html";

interface IAnswer {
  text: string;
  isCorrect: boolean;
}
const schema = yup
  .object()
  .shape({
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

const CreateQuestion = () => {
  const [questionType] = useQuery({
    key: "type",
    defaultValue: QuestionType.MULTIPLE_CHOICE,
  });
  const { fetchLanguages } = useLanguageStore();
  const [answers, setAnswers] = useState<IAnswer[]>([
    { text: "", isCorrect: false },
  ]);
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
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

  const languages = watch("acceptedLanguages") as string[];
  const initCode = watch("initCode");
  const navigate = useNavigate();
  const { addQuestion } = useQuestionStore();

  const [testcases, setTestCases] = useState([
    { input: "", expectedOutput: "" },
  ]);

  const setFooterActions = useCommonStore((state) => state.setFooterActions);
  const setHeaderTitle = useCommonStore((state) => state.setHeaderTitle);
  const resetActions = useCommonStore((state) => state.resetActions);
  const { showToast } = useToast();

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
    let payload = { ...data, type: questionType };
    if (questionType == QuestionType.CODE) {
      if (testcases.length == 0) {
        return showToast({
          message: "Vui lòng nhập test case",
          summary: "Thông báo",
          severity: "info",
        });
      }

      if (testcases.find((item: any) => !item.input || !item.expectedOutput)) {
        return showToast({
          message: "Vui lòng không bỏ trống input or expectedOutput",
          summary: "Thông báo",
          severity: "info",
        });
      }

      if (Object.keys(payload.initCode).length == 0) {
        return showToast({
          message: "Vui lòng ấn khởi tạo",
          summary: "Thông báo",
          severity: "info",
        });
      }

      payload["testCases"] = testcases.map((item) => ({
        ...item,
        grade: Math.round(10 / testcases.length),
      }));
    }

    const result = await addQuestion(payload);
    if (!result) {
      showToast({
        severity: "danger",
        summary: "Thông báo",
        message: "Tạo thất bại",
        life: 3000,
      });
      return;
    }
    showToast({
      severity: "success",
      summary: "Thông báo",
      message: "Tạo thành công",
      life: 3000,
    });
    navigate(pathNames.QUESTION);
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
    setHeaderTitle("Tạo câu hỏi");
    fetchLanguages();

    return () => {
      resetActions();
    };
  }, []);

  const QuestionForm = useMemo(() => {
    console.log(questionType);
    let form;
    switch (questionType) {
      case QuestionType.MULTIPLE_CHOICE:
        form = QuestionMultiChoiceForm;
        break;
      case QuestionType.CODE:
        form = QuestionCodeForm;
        break;
      case QuestionType.CODE_HTML:
        form = QuestionCodeHtmlForm
        break;
    }


    return form;
  }, [questionType]);

  const handleChangeTestCase = (
    key: "input" | "expectedOutput",
    value: any,
    index: number
  ) => {
    const newTestcases = [...testcases];
    newTestcases[index][key] = value;
    setTestCases(newTestcases);
  };
  const handleSetValue = (
    index: number,
    value: any,
    key: "text" | "isCorrect"
  ) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      if (key === "isCorrect") {
        newAnswers.forEach((ans, idx) => {
          ans.isCorrect = idx === index;
        });
      } else {
        newAnswers[index].text = value;
      }
      return newAnswers;
    });
  };
  const handleAdd = () => {
    setAnswers((prev) => [...prev, { text: "", isCorrect: false }]);
  };
  const handleDelete = (index: number) => {
    if (answers.length > 1) {
      setAnswers((prev) => prev.filter((_, idx) => idx !== index));
    }
  };

  useEffect(() => {
    setValue("choices", answers);
  }, [answers]);

  return (
    <div className="tw-space-y-4">
      <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
        {QuestionForm?.map((form, index) => (
          <GroupItem
            watch={watch}
            errors={errors}
            {...form}
            key={index}
            control={control}
          />
        ))}
      </form>
      {questionType === QuestionType.MULTIPLE_CHOICE && (
        <MyCard
          title="Đáp án"
          className="tw-flex tw-flex-col tw-gap-4"
          tooltip={
            <div>
              <ul className="">
                <li>Chọn đáp án đúng ở cột bên trái</li>
                <li>Ô nhập dùng để nhập đáp án</li>
              </ul>
            </div>
          }
        >
          {answers.map((answer: IAnswer, index: number) => (
            <div className="tw-flex tw-items-center tw-justify-between tw-gap-2">
              <div
                className="tw-flex tw-items-center tw-gap-2 tw-w-full"
                key={index}
              >
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
                onClick={() => handleDelete(index)}
              />
            </div>
          ))}
          <Button
            text
            className="tw-w-full"
            label="Thêm đáp án"
            onClick={handleAdd}
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

      {questionType === QuestionType.CODE_HTML && <MyCard title="Code khởi tạo">
        <MyHtmlCodeEditor htmlInitialValue={defaultHtmlCode} />
      </MyCard>}
    </div>
  );
};

export default CreateQuestion;
