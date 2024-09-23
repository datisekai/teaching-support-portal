import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import GroupItem from "../../components/Form/GroupItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { set, useForm } from "react-hook-form";
import { useCommonStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
import { ClassForm } from "../../dataForm/class";
const teacherOptions =
  ClassForm[0].attributes.find((attr) => attr.prop === "teacher")?.options ||
  [];
const subjectOptions =
  ClassForm[0].attributes.find((attr) => attr.prop === "subject")?.options ||
  [];
const schema = yup
  .object()
  .shape({
    name: yup.string().required("Tên lớp học là bắt buộc."),
    dueDate: yup.string().required("Mô tả lớp học là bắt buộc."),
    teacher: yup
      .string()
      .oneOf(
        teacherOptions.map((option) => option.value),
        "Giảng viên là bắt buộc."
      )
      .required("Giảng viên là bắt buộc."),
    subject: yup
      .string()
      .oneOf(
        subjectOptions.map((option) => option.value),
        "Môn học là bắt buộc."
      )
      .required("Môn học là bắt buộc."),
  })
  .required();
const EditClass = () => {
  const { id } = useParams();

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      dueDate: "",
      subject: "",
      teacher: "",
    },
  });

  useEffect(() => {
    reset({
      name: "nhom 02",
      dueDate: "2023-01-01",
      subject: "jv",
      teacher: "nvb",
    });
  }, []);
  const navigate = useNavigate();
  const { setHeaderTitle, setFooterActions, resetActions } = useCommonStore();

  const onSubmit = () => {
    console.log("data", id);
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
        title: "Sửa lớp học",
        icon: "pi-plus",
      },
    ];
    setFooterActions(actions);
    setHeaderTitle("Chỉnh sửa lớp học");

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

export default EditClass;
