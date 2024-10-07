import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { FacultyForm } from "../../dataForm/faculty";
import GroupItem from "../../components/Form/GroupItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { set, useForm } from "react-hook-form";
import { useCommonStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
const schema = yup
  .object()
  .shape({
    name: yup.string().required("Tên ngành học là bắt buộc."),
    description: yup.string().required("Mô tả ngành học là bắt buộc."),
  })
  .required();
const EditFaculty = () => {
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
    },
  });

  useEffect(() => {
    reset({
      name: "cong nghe thong tin",
      description: "abc",
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
    setHeaderTitle("Chỉnh sửa ngành học");

    return () => {
      resetActions();
    };
  }, []);

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
        {FacultyForm.map((form, index) => (
          <GroupItem errors={errors} {...form} key={index} control={control} />
        ))}
      </form>
    </div>
  );
};

export default EditFaculty;
