import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import GroupItem from "../../components/Form/GroupItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { set, useForm } from "react-hook-form";
import { useCommonStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
import { StudentForm } from "../../dataForm/student";
const schema = yup
  .object()
  .shape({
    name: yup.string().required("Tên sinh viên là bắt buộc."),
    code: yup
      .number()
      .notOneOf([0], "Mã sinh viên là bắt buộc.")
      .required("Mã sinh viên là bắt buộc."),
    email: yup
      .string()
      .email("Email phải là bắt buộc.")
      .required("Email phải là bắt buộc."),
    phoneNumber: yup.string().required("Số điện thoại phải là bắt buộc."),
  })
  .required();
const EditStudent = () => {
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
      code: 0,
      email: "",
      phoneNumber: "",
    },
  });

  useEffect(() => {
    reset({
      name: "Nghuyễn văn c",
      code: 31204398213,
      email: "abc@gmail.com",
      phoneNumber: "0339463641",
    });
  }, []);
  const navigate = useNavigate();

  const setFooterActions = useCommonStore((state) => state.setFooterActions);
  const setHeaderTitle = useCommonStore((state) => state.setHeaderTitle);
  const resetActions = useCommonStore((state) => state.resetActions);

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
    setHeaderTitle("Chỉnh sửa sinh viên");

    return () => {
      resetActions();
    };
  }, []);

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
        {StudentForm.map((form, index) => (
          <GroupItem errors={errors} {...form} key={index} control={control} />
        ))}
      </form>
    </div>
  );
};

export default EditStudent;
