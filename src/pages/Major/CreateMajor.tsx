import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import GroupItem from "../../components/Form/GroupItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { set, useForm } from "react-hook-form";
import { useCommonStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
import { MajorForm } from "../../dataForm/major";
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
    faculty: yup
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
const CreateMajor = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      description: "",
      name: "",
      code: 0,
      faculty: "",
      teacher: [],
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
    setHeaderTitle("Tạo môn học");

    return () => {
      resetActions();
    };
  }, []);

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
        {MajorForm.map((form, index) => (
          <GroupItem errors={errors} {...form} key={index} control={control} />
        ))}
      </form>
    </div>
  );
};

export default CreateMajor;
