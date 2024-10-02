import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import GroupItem from "../../components/Form/GroupItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useCommonStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
import { ExamForm } from "../../dataForm/exam";
import { PickListChangeEvent } from "primereact/picklist";
import MyPickList, { ISource } from "../../components/UI/MyPickList";
import { questions } from "../../dataTable/question";
import MyCard from "../../components/UI/MyCard";

const schema = yup
  .object()
  .shape({
    examTitle: yup.string().required("Tiêu đề bài thi là bắt buộc."),
    subject: yup.string().required("Môn học là bắt buộc."),
    classGroup: yup.string().required("Nhóm lớp là bắt buộc."),
    startTime: yup.date().nullable().required("Thời gian bắt đầu là bắt buộc."),
    endTime: yup.date().nullable().required("Thời gian kết thúc là bắt buộc."),
    type: yup.string().required("Loại đề thi là bắt buộc."),
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
      examTitle: "",
      subject: "",
      classGroup: "",
      startTime: undefined,
      endTime: undefined,
      type: "",
    },
  });

  const navigate = useNavigate();

  const setFooterActions = useCommonStore((state) => state.setFooterActions);
  const setHeaderTitle = useCommonStore((state) => state.setHeaderTitle);
  const resetActions = useCommonStore((state) => state.resetActions);

  const [source, setSource] = useState<ISource[]>(
    questions.map((question) => ({
      id: question.id,
      content: question.topic,
      subcontent: (
        <div>
          <span>Chương: {question.chapter}</span>
          <span>Độ khó: {question.level}</span>
        </div>
      ),
      detail: question,
    }))
  );
  const [target, setTarget] = useState([]);

  const onChange = (event: PickListChangeEvent) => {
    setSource(event.source);
    setTarget(event.target);
  };

  const onSubmit = (data: any) => {
    console.log("Dữ liệu bài thi đã submit", data);
    // Xử lý logic lưu trữ dữ liệu
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
        title: "Tạo bài thi",
        icon: "pi-plus",
      },
    ];
    setFooterActions(actions);
    setHeaderTitle("Tạo bài thi");

    return () => {
      resetActions();
    };
  }, [handleSubmit, setFooterActions, setHeaderTitle, resetActions]);

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
        {ExamForm.map((form, index) => (
          <GroupItem errors={errors} {...form} key={index} control={control} />
        ))}

        <MyCard title="Danh sách câu hỏi">
          <MyPickList source={source} target={target} onChange={onChange} />
        </MyCard>
      </form>
    </div>
  );
};

export default CreateExam;
