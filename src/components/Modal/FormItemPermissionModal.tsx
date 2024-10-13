import React, { useEffect } from "react";
import GroupItem from "../Form/GroupItem";
import { useModalStore, useRoleStore } from "../../stores";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "primereact/button";
import { PermissionForm } from "../../dataForm/permissionForm";
import FormItem from "../Form/FormItem";
import { RoleService } from "../../services/roleService";
import { useToast } from "../../hooks/useToast";
const schema = yup
  .object()
  .shape({
    name: yup.string().required("Tên quyền là bắt buộc."),
  })
  .required();
const FormItemPermissionModal = () => {
  const { roles, total, addRole, updateRole } = useRoleStore();
  const { showToast } = useToast();
  const showToastCreateUpdate = (
    type: "create" | "update",
    result: boolean
  ) => {
    const title = type === "create" ? "Tạo" : "Sửa";
    if (!result) {
      return showToast({
        severity: "danger",
        summary: "Thông báo",
        message: `${title} thất bại`,
        life: 3000,
      });
    }
    showToast({
      severity: "success",
      summary: "Thông báo",
      message: `${title} thành công`,
      life: 3000,
    });
  };
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
  const onSubmit = async (data: any) => {
    if (content) {
      const result = await updateRole(content.id, data);
      showToastCreateUpdate("update", result);
    } else {
      const result = await addRole(data);
      showToastCreateUpdate("create", result);
    }
    onDismiss();
  };
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
        {PermissionForm[0].attributes.map((attribute) => (
          <FormItem
            error={(errors as any)[attribute.prop]?.message || ""}
            key={attribute.prop}
            {...attribute}
            control={control}
          />
        ))}
      </form>
      <div className="tw-mt-4 tw-flex tw-justify-end">
        <Button
          label={content ? "Cập nhật" : "Tạo"}
          icon="pi pi-check"
          autoFocus
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </div>
  );
};

export default FormItemPermissionModal;
