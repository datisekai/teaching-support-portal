import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import GroupItem from "../../components/Form/GroupItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { set, useForm } from "react-hook-form";
import { useCommonStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
import { ClassForm } from "../../dataForm/classForm";
import { useClassStore } from "../../stores/classStore";
import { pathNames } from "../../constants";
import { useToast } from "../../hooks/useToast";

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Tên lớp học là bắt buộc."),
    duration: yup.string().required("Năm học là bắt buộc."),
    teacherCodes: yup
      .array()
      .min(1, "Giảng viên là bắt buộc.")
      .required("Giảng viên là bắt buộc."),
    majorId: yup.string().required("Môn học là bắt buộc."),
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
      duration: "",
      majorId: "",
      teacherCodes: [],
    },
  });
  const navigate = useNavigate();

  const setFooterActions = useCommonStore((state) => state.setFooterActions);
  const setHeaderTitle = useCommonStore((state) => state.setHeaderTitle);
  const resetActions = useCommonStore((state) => state.resetActions);
  const { classes, fetchClass, addClass } = useClassStore();
  const { showToast } = useToast();
  const onSubmit = async (values: any) => {
    const transferData = {
      ...values,
      majorId: Number(values.majorId),
      teacherCodes: values.teacherCodes.map((item: any) => Number(item.value)),
    };
    const result = await addClass(transferData);
    if (!result) {
      return showToast({
        severity: "danger",
        summary: "Thông báo",
        message: "Tạo thất bại",
        life: 3000,
      });
    }
    showToast({
      severity: "success",
      summary: "Thông báo",
      message: "Tạo thành công",
      life: 3000,
    });
    navigate(pathNames.CLASS);
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
