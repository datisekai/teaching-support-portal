import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import GroupItem from "../../components/Form/GroupItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useCommonStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
import { QuestionForm } from "../../dataForm/questionForm";

// Schema validation
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

const EditQuestion = () => {
  const { id } = useParams(); // Lấy id của câu hỏi từ URL
  const navigate = useNavigate();

  // Dữ liệu mặc định (có thể được lấy từ API dựa trên id)
  const fetchQuestion = (id: string | undefined) => {
    // Giả sử bạn lấy dữ liệu từ API
    return {
      question: "Ví dụ câu hỏi?",
      content: "Nội dung ví dụ của câu hỏi",
      correctAnswer: "A",
      major: "math",
      chapter: "chapter1",
      difficulty: "easy",
      status: "public",
    };
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset, // Sử dụng để điền dữ liệu mặc định khi lấy từ API
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

  useEffect(() => {
    // Lấy dữ liệu câu hỏi dựa trên id
    const questionData = fetchQuestion(id);
    reset(questionData); // Điền dữ liệu mặc định vào form
  }, [id, reset]);

  const setFooterActions = useCommonStore((state) => state.setFooterActions);
  const setHeaderTitle = useCommonStore((state) => state.setHeaderTitle);
  const resetActions = useCommonStore((state) => state.resetActions);

  const onSubmit = (data: any) => {
    console.log("Dữ liệu đã cập nhật", data);
    // Giả sử gửi dữ liệu cập nhật tới server tại đây
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
        title: "Lưu thay đổi",
        icon: "pi-save",
      },
    ];
    setFooterActions(actions);
    setHeaderTitle("Chỉnh sửa câu hỏi");

    return () => {
      resetActions();
    };
  }, [handleSubmit, setFooterActions, setHeaderTitle, resetActions]);

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

export default EditQuestion;
