import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import GroupItem from "../../components/Form/GroupItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { set, useForm } from "react-hook-form";
import { useCommonStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
import { UserForm } from "../../dataForm/user";
const schema = yup
  .object()
  .shape({
    name: yup.string().required("Tên người dùng là bắt buộc."),
    code: yup
      .number()
      .notOneOf([0], "Mã người dùng là bắt buộc.")
      .required("Mã người dùng là bắt buộc."),
    email: yup
      .string()
      .email("Email phải là bắt buộc.")
      .required("Email phải là bắt buộc."),
    phoneNumber: yup.string().required("Số điện thoại phải là bắt buộc."),
  })
  .required();
const CreateUser = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      code: 0,
      email: "",
      phoneNumber: "",
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
    setHeaderTitle("Tạo người dùng");

    return () => {
      resetActions();
    };
  }, []);

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
        {UserForm.map((form, index) => (
          <GroupItem errors={errors} {...form} key={index} control={control} />
        ))}
      </form>
    </div>
  );
};

export default CreateUser;
