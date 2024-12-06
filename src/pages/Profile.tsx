import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import GroupItem from "../components/Form/GroupItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useCommonStore } from "../stores";
import { IAction } from "../stores/commonStore";
import { useToast } from "../hooks/useToast";
import { pathNames } from "../constants";
import { ProfileForm } from "../dataForm/profileForm.ts";
import { useUserStore } from "../stores/userStore.ts";

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Họ và tên là bắt buộc."),
    code: yup.string().required("Mã số là bắt buộc"),
    avatar: yup.string().required("Avatar là bắt buộc"),
    email: yup.string().required("Email là bắt buộc"),
    phone: yup.string().required("Số đện thoại là bắt buộc"),
  })
  .required();

const Profile = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      code: "",
      avatar: "",
      email: "",
      phone: "",
    },
  });

  const navigate = useNavigate();

  const setFooterActions = useCommonStore((state) => state.setFooterActions);
  const setHeaderTitle = useCommonStore((state) => state.setHeaderTitle);
  const resetActions = useCommonStore((state) => state.resetActions);
  const { showToast } = useToast();
  const { user, updateProfile } = useUserStore();
  const onSubmit = async (values: any) => {
    const result = await updateProfile(values);
    if (!result) {
      showToast({
        severity: "danger",
        summary: "Thông báo",
        message: "Cập nhật thất bại",
        life: 3000,
      });
      return;
    }
    showToast({
      severity: "success",
      summary: "Thông báo",
      message: "Cập nhật thành công",
      life: 3000,
    });
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
    setHeaderTitle("Tài khoản");

    return () => {
      resetActions();
    };
  }, []);

  useEffect(() => {
    setValue("avatar", user.avatar || "");
    setValue("code", user.code || "");
    setValue("name", user.name || "");
    setValue("email", user.email || "");
    setValue("phone", user.phone || "");
  }, [user.code, user.name, user.avatar, user.email, user.phone]);

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
        {ProfileForm.map((form, index) => (
          <GroupItem errors={errors} {...form} key={index} control={control} />
        ))}
      </form>
    </div>
  );
};

export default Profile;
