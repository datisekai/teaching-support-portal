import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import GroupItem from "../../components/Form/GroupItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { set, useForm } from "react-hook-form";
import { useCommonStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
import { UserForm } from "../../dataForm/userForm";
import { interfaceForm } from "../../dataForm/interfaceForm";
import { useMetaStore } from "../../stores/metaStore";
import { useToast } from "../../hooks/useToast";
import MyLoading from "../../components/UI/MyLoading";
const schema = yup
  .object()
  .shape({
    name: yup.string().required("Tên người dùng là bắt buộc."),
    logo: yup.string().required("Logo phải là bắt buộc."),
    favicon: yup.string().required("Favicon phải là bắt buộc."),
  })
  .required();
const Interface = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      logo: "",
      favicon: "",
    },
  });
  const navigate = useNavigate();

  const setFooterActions = useCommonStore((state) => state.setFooterActions);
  const setHeaderTitle = useCommonStore((state) => state.setHeaderTitle);
  const resetActions = useCommonStore((state) => state.resetActions);
  const { meta, fetchMeta, updateMeta, isLoadingMetas } = useMetaStore();
  const { showToast } = useToast();
  const onSubmit = async (values: any) => {
    try {
      const result = await updateMeta(values);
      if (!result) {
        showToast({
          severity: "danger",
          summary: "Thông báo",
          message: "Cập nhật thất bại",
          life: 3000,
        });
      } else {
        showToast({
          severity: "success",
          summary: "Thông báo",
          message: "Cập nhật thành công",
          life: 3000,
        });
      }
    } catch (error) {
      showToast({
        severity: "danger",
        summary: "Thông báo",
        message: "Cập nhật thất bại",
        life: 3000,
      });
    }
  };

  useEffect(() => {
    const actions: IAction[] = [
      {
        onClick: handleSubmit(onSubmit),
        title: "Lưu thay đổi",
        // icon: "pi-plus",
      },
    ];
    setFooterActions(actions);
    setHeaderTitle("Chỉnh sửa giao diện");

    return () => {
      resetActions();
    };
  }, [resetActions, setHeaderTitle, setFooterActions]);

  useEffect(() => {
    fetchMeta();
  }, []);
  useEffect(() => {
    if (meta) {
      setValue("name", meta?.value?.name);
      setValue("logo", meta?.value?.logo);
      setValue("favicon", meta?.value?.favicon);
    }
  }, [meta]);
  return (
    <div>
      <MyLoading isLoading={isLoadingMetas}>
        <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
          {interfaceForm.map((form, index) => (
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

export default Interface;
