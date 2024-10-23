import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import GroupItem from "../../components/Form/GroupItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useCommonStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
import { NotificationForm } from "../../dataForm/notificationForm";
import { useToast } from "../../hooks/useToast";
import { useNotificationStore } from "../../stores/notificationStore";
import { pathNames } from "../../constants";

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Tên thông báo là bắt buộc."),
    image: yup.string().required("Ảnh là bắt buộc."),
    content: yup.string().required("Nội dung thông báo là bắt buộc."),
    classIds: yup
      .array()
      .min(1, "Nhóm lớp là bắt buộc.")
      .required("Nhóm lớp là bắt buộc."),
  })
  .required();

const CreateNotification = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      image: "",
      content: "",
      classIds: [],
    },
  });

  const navigate = useNavigate();

  const setFooterActions = useCommonStore((state) => state.setFooterActions);
  const setHeaderTitle = useCommonStore((state) => state.setHeaderTitle);
  const resetActions = useCommonStore((state) => state.resetActions);
  const { showToast } = useToast();
  const { addNotification } = useNotificationStore();
  const onSubmit = async (values: any) => {
    const transferData = {
      ...values,
      classIds: values.classIds.map((item: any) => Number(item)),
    };
    const result = await addNotification(transferData);
    if (!result) {
      showToast({
        severity: "danger",
        summary: "Thông báo",
        message: "Tạo thất bại",
        life: 3000,
      });
      return;
    }
    showToast({
      severity: "success",
      summary: "Thông báo",
      message: "Tạo thành công",
      life: 3000,
    });
    navigate(pathNames.NOTIFICATION);
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
    setHeaderTitle("Tạo thông báo");

    return () => {
      resetActions();
    };
  }, []);

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
        {NotificationForm.map((form, index) => (
          <GroupItem errors={errors} {...form} key={index} control={control} />
        ))}
      </form>
    </div>
  );
};

export default CreateNotification;
