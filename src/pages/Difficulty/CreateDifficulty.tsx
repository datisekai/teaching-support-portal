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
import { useDifficultyStore } from "../../stores/difficultStore";
import { DifficultyForm } from "../../dataForm/difficultyForm";

const schema = yup
  .object()
  .shape({
    level: yup.string().required("Độ khó là bắt buộc"),
  })
  .required();

const CreateDifficulty = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      level: "",
    },
  });

  const navigate = useNavigate();

  const setFooterActions = useCommonStore((state) => state.setFooterActions);
  const setHeaderTitle = useCommonStore((state) => state.setHeaderTitle);
  const resetActions = useCommonStore((state) => state.resetActions);
  const { showToast } = useToast();
  const { addDifficulty } = useDifficultyStore();
  const onSubmit = async (values: any) => {
    const transferData = {
      ...values,
    };
    const result = await addDifficulty(transferData);
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
    navigate(pathNames.DIFFICULTY);
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
        permission: "difficulty:create",
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
        {DifficultyForm.map((form, index) => (
          <GroupItem errors={errors} {...form} key={index} control={control} />
        ))}
      </form>
    </div>
  );
};

export default CreateDifficulty;
