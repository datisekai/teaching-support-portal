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
import { ChapterForm } from "../../dataForm/chapterForm";
import { useChapterStore } from "../../stores/chapterStore";

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Tên chương là bắt buộc."),
    majorId: yup.string().required("Môn học là bắt buộc."),
  })
  .required();

const CreateChapter = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      majorId: "",
    },
  });

  const navigate = useNavigate();

  const setFooterActions = useCommonStore((state) => state.setFooterActions);
  const setHeaderTitle = useCommonStore((state) => state.setHeaderTitle);
  const resetActions = useCommonStore((state) => state.resetActions);
  const { showToast } = useToast();
  const { addChapter } = useChapterStore();
  const onSubmit = async (values: any) => {
    const transferData = {
      ...values,
    };
    const result = await addChapter(transferData);
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
    navigate(pathNames.CHAPTER);
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
        permission: "notification:create",
      },
    ];
    setFooterActions(actions);
    setHeaderTitle("Tạo chương");

    return () => {
      resetActions();
    };
  }, []);

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
        {ChapterForm.map((form, index) => (
          <GroupItem errors={errors} {...form} key={index} control={control} />
        ))}
      </form>
    </div>
  );
};

export default CreateChapter;
