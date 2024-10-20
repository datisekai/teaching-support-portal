import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as yup from "yup";
import GroupItem from "../../components/Form/GroupItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useCommonStore, useLanguageStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
import { QuestionCodeForm, QuestionMultiChoiceForm } from "../../dataForm/questionForm";
import { useQuery } from "../../hooks/useQuery";
import { QuestionType } from "../../constants";
import { apiConfig, sendServerRequest } from "../../apis";
import MyCard from "../../components/UI/MyCard";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import Editor from '@monaco-editor/react';
import { TabPanel, TabView } from "primereact/tabview";
import { ILanguage } from "../../types/language";
import { useToast } from "../../hooks/useToast";

const schema = yup
  .object()
  .shape({
    title: yup.string().required("Tiêu đề là bắt buộc."),
    content: yup.string().required("Nội dung câu hỏi là bắt buộc."),
    isPublic: yup.boolean(),
    majorId: yup.string().required("Môn học là bắt buộc."),
    chapterId: yup.string().required("Chương là bắt buộc."),
    difficultyId: yup.string().required("Độ khó là bắt buộc."),
    languages: yup.array(),
    initCode: yup.object(),
  })
  .required();

const CreateQuestion = () => {
  const [questionType] = useQuery({ key: 'type', defaultValue: QuestionType.MULTIPLE_CHOICE })
  const { fetchLanguages, languages: allLanguages } = useLanguageStore()

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      content: "",
      isPublic: false,
      majorId: "",
      chapterId: "",
      difficultyId: "",
      languages: [],
      initCode: {}
    },
  });


  const languages = watch('languages')
  const navigate = useNavigate();

  const { showToast } = useToast()
  const [testcases, setTestCases] = useState([{ input: "", expectedOutput: "" }])

  const setFooterActions = useCommonStore((state) => state.setFooterActions);
  const setHeaderTitle = useCommonStore((state) => state.setHeaderTitle);
  const resetActions = useCommonStore((state) => state.resetActions);

  const onSubmit = (data: any) => {
    console.log("Dữ liệu đã submit", data);
    navigate(-1);
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
    fetchLanguages()

    return () => {
      resetActions();
    };
  }, []);

  const QuestionForm = useMemo(() => {
    const form = questionType === QuestionType.MULTIPLE_CHOICE ? QuestionMultiChoiceForm : QuestionCodeForm;

    return form;
  }, [questionType])


  const handleChangeTestCase = (key: "input" | "expectedOutput", value: any, index: number) => {
    const newTestcases = [...testcases];
    newTestcases[index][key] = value;
    setTestCases(newTestcases);
  }


  const selectedLanguages = useMemo(() => {
    if (!languages) return []

    const newLanguages: ILanguage[] = []
    languages.forEach(id => {
      const language = allLanguages.find(item => item.id == id)
      if (language) newLanguages.push(language)
    })

    return newLanguages
  }, [languages?.length])


  const handleInitCode = () => {
    if (selectedLanguages.length == 0) {
      return showToast({
        message: "Vui lòng chọn ngôn ngữ thực hiện",
        severity: 'info',
        summary: "Thông báo"
      })
    }

    if (testcases.length == 0 || testcases[0].input == "" || testcases[0].expectedOutput == "") {
      return showToast({
        message: "Vui lòng nhập test case",
        severity: 'info',
        summary: "Thông báo"
      })
    }
  }
  return (
    <div className="tw-space-y-4">
      <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
        {QuestionForm.map((form, index) => (
          <GroupItem watch={watch} errors={errors} {...form} key={index} control={control} />
        ))}
      </form>

      <MyCard title="Test case" className="">
        {testcases.map((item, index) => {
          return <div key={index} className="tw-flex tw-items-center tw-gap-4">
            <div>
              <p>Input</p>
              <InputTextarea value={item.input} onChange={(e) => handleChangeTestCase("input", e.target.value, index)} rows={5} cols={30} />
            </div>
            <div>
              <p>Kết quả mong đợi</p>
              <InputTextarea value={item.expectedOutput} onChange={(e) => handleChangeTestCase("expectedOutput", e.target.value, index)} rows={5} cols={30} />
            </div>
            <Button onClick={() => setTestCases(testcases.filter((_, i) => i !== index))} icon="pi pi-times" rounded outlined severity="danger" aria-label="Cancel" />
          </div>
        })}

        <div className="tw-mt-2">
          <Button onClick={() => setTestCases([...testcases, { input: "", expectedOutput: "" }])} icon="pi pi-plus" label="Thêm test case"></Button>
        </div>
      </MyCard>

      <MyCard title="Code khởi tạo" tooltip={<div>
        <ul className="">
          <li>Bạn cần chọn ngôn ngữ lập trình và nhập testcase trước.</li>
          <li>Chọn "Khởi tạo", hệ thống sẽ tạo ra các đoạn code khởi tạo đầu vào cho từng ngôn ngữ</li>
        </ul>
      </div>} action={{ title: "Khởi tạo", onClick: handleInitCode, }}>

        {selectedLanguages.length == 0 && <p className="tw-text-center">Vui lòng chọn ngôn ngữ lập trình thực hiện và nhập test case</p>}
        {selectedLanguages.length > 0 && <TabView>
          {selectedLanguages.map((item) => {
            return <TabPanel header={item.name} key={item.id}>
              <Editor height="40vh" defaultLanguage="javascript" defaultValue="// some comment" />;
            </TabPanel>
          })}
        </TabView>}
      </MyCard>
    </div>
  );
};

export default CreateQuestion;
