import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import GroupItem from "../../components/Form/GroupItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useCommonStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
import { QuestionForm } from "../../dataForm/questionForm";

const schema = yup
  .object()
  .shape({
    question: yup.string().required("Câu hỏi là bắt buộc."),
    content: yup.string().required("Nội dung câu hỏi là bắt buộc."),
    correctAnswer: yup.string().required("Đáp án đúng là bắt buộc."),
    major: yup.string().required("Môn học là bắt buộc."),
    chapter: yup.string().required("Chương là bắt buộc."),
    difficulty: yup.string().required("Độ khó là bắt buộc."),
    status: yup.string().required("Trạng thái là bắt buộc."),
  })
  .required();

const CreateQuestion = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      question: "",
      content: "",
      correctAnswer: "",
      major: "",
      chapter: "",
      difficulty: "",
      status: "",
    },
  });

  const navigate = useNavigate();

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

    return () => {
      resetActions();
    };
  }, []);

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
        {QuestionForm.map((form, index) => (
          <GroupItem errors={errors} {...form} key={index} control={control} />
        ))}
      </form>
    </div>
  );
};

export default CreateQuestion;
