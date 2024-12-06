import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import GroupItem from "../../components/Form/GroupItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { set, useForm } from "react-hook-form";
import { useCommonStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
import { NotificationForm } from "../../dataForm/notificationForm";
import { useNotificationStore } from "../../stores/notificationStore";
import { useClassStore } from "../../stores/classStore";
import MyLoading from "../../components/UI/MyLoading";
import { useToast } from "../../hooks/useToast";
import { pathNames } from "../../constants";

// Định nghĩa schema validation cho Notification
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

const EditNotification = () => {
  const { id } = useParams();
  const { isLoadingApi } = useCommonStore();
  const { notification, fetchNotification, updateNotification } =
    useNotificationStore();
  const { classes, fetchClasses } = useClassStore();
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
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

  useEffect(() => {
    fetchNotification(id || "");
    fetchClasses({ pagination: false }).then(() => setIsLoading(true));
  }, [id]);
  useEffect(() => {
    if (notification) {
      setValue("name", notification.name);
      setValue("image", notification.image);
      setValue("content", notification.content);
      setValue(
        "classIds",
        notification?.classes?.map((item: any) => ({
          title: `${item.name}`,
          value: item.id,
        }))
      );
    }
  }, [notification]);
  const navigate = useNavigate();

  const setFooterActions = useCommonStore((state) => state.setFooterActions);
  const setHeaderTitle = useCommonStore((state) => state.setHeaderTitle);
  const resetActions = useCommonStore((state) => state.resetActions);
  const { showToast } = useToast();
  const onSubmit = async (data: any) => {
    const formattedData = {
      ...data,
      classId: data.classIds.map((item: any) => Number(item)),
    };

    const result = await updateNotification(parseInt(id || ""), formattedData);
    if (!result) {
      return showToast({
        severity: "danger",
        summary: "Thông báo",
        message: "Sửa thất bại",
        life: 3000,
      });
    }
    showToast({
      severity: "success",
      summary: "Thông báo",
      message: "Sửa thành công",
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
        title: "Lưu thay đổi",
        permission: "notification:update",
      },
    ];
    setFooterActions(actions);
    setHeaderTitle("Chỉnh sửa thông báo");

    return () => {
      resetActions();
    };
  }, []);

  return (
    <div>
      <MyLoading isLoading={isLoadingApi || !isLoading}>
        <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
          {NotificationForm.map((form, index) => (
            <GroupItem
              errors={errors}
              {...form}
              key={index}
              control={control}
            />
          ))}
        </form>
      </MyLoading>
    </div>
  );
};

export default EditNotification;
