import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import GroupItem from "../../components/Form/GroupItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useCommonStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
import { NotificationForm } from "../../dataForm/notification";

// Định nghĩa schema validation cho Notification
const schema = yup
  .object()
  .shape({
    title: yup.string().required("Tên thông báo là bắt buộc."),
    content: yup.string().required("Nội dung thông báo là bắt buộc."),
    major: yup
      .string()
      .required("Môn học là bắt buộc.")
      .required("Môn học là bắt buộc."),
    classGroup: yup.string().required("Nhóm lớp là bắt buộc."),
  })
  .required();

const EditNotification = () => {
  const { id } = useParams();

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      content: "",
      classGroup: "",
      major: "",
    },
  });

  useEffect(() => {
    reset({
      title: "Thông báo kiểm tra giữa kỳ",
      content: "Lịch kiểm tra giữa kỳ sẽ diễn ra vào ngày 15/10.",
      classGroup: "A",
      major: "jv",
    });
  }, []);

  const navigate = useNavigate();

  const setFooterActions = useCommonStore((state) => state.setFooterActions);
  const setHeaderTitle = useCommonStore((state) => state.setHeaderTitle);
  const resetActions = useCommonStore((state) => state.resetActions);

  const onSubmit = (data: any) => {
    console.log("Dữ liệu đã submit", data);
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
      <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
        {NotificationForm.map((form, index) => (
          <GroupItem errors={errors} {...form} key={index} control={control} />
        ))}
      </form>
    </div>
  );
};

export default EditNotification;
