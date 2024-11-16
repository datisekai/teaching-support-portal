import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import GroupItem from "../../components/Form/GroupItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { set, useForm } from "react-hook-form";
import { useCommonStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
import { StudentForm } from "../../dataForm/studentForm";
import { pathNames } from "../../constants";
import { useUserStore } from "../../stores/userStore";
import { useToast } from "../../hooks/useToast";
import { useClassStore } from "../../stores/classStore";
const schema = yup
  .object()
  .shape({
    name: yup.string().required("Tên sinh viên là bắt buộc."),
    code: yup.string().required("Mã sinh viên là bắt buộc."),
    // email: yup
    //   .string()
    //   .email("Email phải là bắt buộc.")
    //   .required("Email phải là bắt buộc."),
    // phone: yup.string().required("Số điện thoại phải là bắt buộc."),
    // password: yup.string().required("Mật khẩu phải là bắt buộc."),
  })
  .required();
const CreateStudent = () => {
  const { id } = useParams();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      code: "",
      // email: "",
      // phone: "",
      // password: "",
    },
  });
  const navigate = useNavigate();

  const setFooterActions = useCommonStore((state) => state.setFooterActions);
  const setHeaderTitle = useCommonStore((state) => state.setHeaderTitle);
  const resetActions = useCommonStore((state) => state.resetActions);
  const { showToast } = useToast();
  const { importUsers, fetchClass } = useClassStore()
  const onSubmit = async (data: any) => {
    const result = await importUsers(id as string, { users: [data] });
    if (!result) {
      return showToast({
        severity: "danger",
        summary: "Thông báo",
        message: "Thêm thất bại",
        life: 3000,
      });
    }
    showToast({
      severity: "success",
      summary: "Thông báo",
      message: "Thêm thanh cong",
      life: 3000,
    });
    fetchClass(id as string)
    navigate(`/student/detail/${id}`)

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
        title: "Thêm sinh viên",
        icon: "pi-plus",
      },
    ];
    setFooterActions(actions);
    setHeaderTitle("Thêm sinh viên");

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

export default CreateStudent;
