import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import GroupItem from "../../components/Form/GroupItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useCommonStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
import { NotificationForm } from "../../dataForm/notification";

const schema = yup
  .object()
  .shape({
    title: yup.string().required("Tên thông báo là bắt buộc."),
    content: yup.string().required("Nội dung thông báo là bắt buộc."),
    classGroup: yup.string().required("Nhóm lớp là bắt buộc."),
    subject: yup
      .string()
      .required("Môn học là bắt buộc.")
      .required("Môn học là bắt buộc."),
  })
  .required();

const CreateExam = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      content: "",
      classGroup: "",
      subject: "",
    },
  });

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

export default CreateExam;
