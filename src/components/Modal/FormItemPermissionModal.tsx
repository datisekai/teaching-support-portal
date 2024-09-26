import React, { useEffect } from "react";
import GroupItem from "../Form/GroupItem";
import { useModalStore } from "../../stores";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "primereact/button";
import { PermissionForm } from "../../dataForm/permission";
const schema = yup
  .object()
  .shape({
    name: yup.string().required("Tên quyền là bắt buộc."),
  })
  .required();
const FormItemPermissionModal = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
    },
  });
  const { content, onDismiss } = useModalStore();
  useEffect(() => {
    if (content)
      reset({
        name: content?.name,
      });
  }, []);
  const onSubmit = (data: any) => {
    console.log("aaaa: ", data);
    onDismiss();
  };
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
        {PermissionForm.map((form, index) => (
          <GroupItem errors={errors} {...form} key={index} control={control} />
        ))}
      </form>
      <div className="tw-mt-4 tw-flex tw-justify-end">
        <Button
          label="Tạo"
          icon="pi pi-check"
          autoFocus
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </div>
  );
};

export default FormItemPermissionModal;
