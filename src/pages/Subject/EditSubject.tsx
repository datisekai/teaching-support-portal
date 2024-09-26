import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import GroupItem from "../../components/Form/GroupItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { set, useForm } from "react-hook-form";
import { useCommonStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
import { SubjectForm } from "../../dataForm/subject";
import { ClassForm } from "../../dataForm/class";

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Tên môn học là bắt buộc."),
    description: yup.string().required("Mô tả môn học là bắt buộc."),
    code: yup
      .number()
      .notOneOf([0], "Mã môn học là bắt buộc.")
      .required("Mã môn học là bắt buộc."),
    department: yup
      .string()
      .required("Ngành học là bắt buộc.")
      .required("Ngành học là bắt buộc."),
    teacher: yup
      .array()
      .required("Giảng viên không hợp lệ.")
      .min(1, "Giảng viên là bắt buộc.")
      .required("Giảng viên là bắt buộc."),
  })
  .required();
const EditSubject = () => {
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
      description: "",
      code: 0,
      department: "",
      teacher: [],
    },
  });

  useEffect(() => {
    reset({
      name: "cong nghe thong tin",
      description: "abc",
      code: 812032,
      department: "khmt",
      teacher: ["nvb", "nva"],
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
        title: "Lưu thay đổi",
        // icon: "pi-plus",
      },
    ];
    setFooterActions(actions);
    setHeaderTitle("Chỉnh sửa môn học");

    return () => {
      resetActions();
    };
  }, []);

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
        {SubjectForm.map((form, index) => (
          <GroupItem errors={errors} {...form} key={index} control={control} />
        ))}
      </form>
    </div>
  );
};

export default EditSubject;
