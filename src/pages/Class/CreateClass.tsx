import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import GroupItem from "../../components/Form/GroupItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { set, useForm } from "react-hook-form";
import { useCommonStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
import { ClassForm } from "../../dataForm/classForm";

const teacherOptions =
  ClassForm[0].attributes.find((attr) => attr.prop === "teacher")?.options ||
  [];
const majorOptions =
  ClassForm[0].attributes.find((attr) => attr.prop === "major")?.options || [];
const schema = yup
  .object()
  .shape({
    name: yup.string().required("Tên lớp học là bắt buộc."),
    dueDate: yup.string().required("Năm học là bắt buộc."),
    teacher: yup
      .string()
      .oneOf(
        teacherOptions.map((option) => option.value),
        "Giảng viên là bắt buộc."
      )
      .required("Giảng viên là bắt buộc."),
    major: yup
      .string()
      .oneOf(
        majorOptions.map((option) => option.value),
        "Môn học là bắt buộc."
      )
      .required("Môn học là bắt buộc."),
  })
  .required();
const CreateClass = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      dueDate: "",
      major: "",
      teacher: "",
    },
  });
  const navigate = useNavigate();

  const setFooterActions = useCommonStore((state) => state.setFooterActions);
  const setHeaderTitle = useCommonStore((state) => state.setHeaderTitle);
  const resetActions = useCommonStore((state) => state.resetActions);

  const onSubmit = () => {
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
    setHeaderTitle("Tạo lớp học");

    return () => {
      resetActions();
    };
  }, []);

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
        {ClassForm.map((form, index) => (
          <GroupItem errors={errors} {...form} key={index} control={control} />
        ))}
      </form>
    </div>
  );
};

export default CreateClass;
