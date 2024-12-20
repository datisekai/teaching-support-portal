import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "primereact/button";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ProfileFormModal } from "../../dataForm/profileForm.ts";
import { useToast } from "../../hooks/useToast.ts";
import { useModalStore } from "../../stores/modalStore.ts";
import { useUserStore } from "../../stores/userStore.ts";
import FormItem from "../Form/FormItem.tsx";

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Họ và tên là bắt buộc."),
    code: yup.string().required("Mã số là bắt buộc"),
    email: yup.string().required("Email là bắt buộc"),
  })
  .required();

const UpdateProfileModal = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      code: "",
      email: "",
    },
  });
  const { user, updateProfile } = useUserStore();
  const { showToast } = useToast();
  const { onDismiss } = useModalStore();

  const onSubmit = async (values: any) => {
    const result = await updateProfile(values);
    onDismiss();
    if (!result) {
      showToast({
        severity: "error",
        summary: "Thông báo",
        message: "Cập nhật thất bại",
        life: 3000,
      });
      return;
    }
    showToast({
      severity: "success",
      summary: "Thông báo",
      message: "Cập nhật thành công",
      life: 3000,
    });
  };

  useEffect(() => {
    if (user) {
      setValue("code", user.code);
      setValue("name", user.name);
      setValue("email", user?.email || "");
    }
  }, [user]);

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
        {ProfileFormModal.attributes.map((attribute) => (
          <FormItem
            error={(errors as any)[attribute.prop]?.message || ""}
            key={attribute.prop}
            {...attribute}
            control={control}
          />
        ))}
        <div className={"tw-mt-8 tw-flex tw-justify-end"}>
          <Button onClick={handleSubmit(onSubmit)} label={"Cập nhật"}></Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfileModal;
