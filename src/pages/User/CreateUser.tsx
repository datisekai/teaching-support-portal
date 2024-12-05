import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import GroupItem from "../../components/Form/GroupItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { set, useForm } from "react-hook-form";
import { useCommonStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
import { UserForm } from "../../dataForm/userForm";
import { useUserStore } from "../../stores/userStore";
import { pathNames } from "../../constants";
import { useToast } from "../../hooks/useToast";
const schema = yup
  .object()
  .shape({
    name: yup.string().required("Tên người dùng là bắt buộc."),
    code: yup.string().required("Mã SV/GV là bắt buộc."),
    email: yup
      .string()
      .email("Đúng định dạng email.")
      .required("Email phải là bắt buộc."),
    phoneNumber: yup.string(),
    password: yup.string().min(6).required("Mật khẩu là bắt buộc."),
    roleId: yup.string().required("Quyền là bắt buộc"),
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
      code: "",
      email: "",
      password: "",
      phoneNumber: "",
      roleId: "",
    },
  });
  const navigate = useNavigate();
  const { user, addUser } = useUserStore();
  const { showToast } = useToast();
  const { setFooterActions, setHeaderTitle, resetActions } = useCommonStore();

  const onSubmit = async (values: any) => {
    const transferData = {
      ...values,
      roleId: Number(values.roleId),
    };
    const result = await addUser(transferData);
    if (!result) {
      return showToast({
        severity: "danger",
        summary: "Thông báo",
        message: "Tạo thất bại/ Mã số đã tồn tại",
        life: 3000,
      });
    }
    showToast({
      severity: "success",
      summary: "Thông báo",
      message: "Tạo thành công",
      life: 3000,
    });
    navigate(pathNames.USER);
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
        permission: "user:create",
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
