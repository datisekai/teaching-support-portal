import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import GroupItem from "../../components/Form/GroupItem";
import MyLoading from "../../components/UI/MyLoading";
import { pathNames } from "../../constants";
import { UserForm, UserFormUpdate } from "../../dataForm/userForm";
import { useToast } from "../../hooks/useToast";
import { useCommonStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
import { useUserStore } from "../../stores/userStore";
const schema = yup
  .object()
  .shape({
    name: yup.string().required("Tên người dùng là bắt buộc."),
    code: yup.string().required("Mã SV/GV là bắt buộc."),
    email: yup.string().email("Email phải là bắt buộc."),
    phone: yup.string(),
    active: yup.boolean(),
    roleId: yup.string().required("Quyền là bắt buộc"),
  })
  .required();
const EditUser = () => {
  const { id } = useParams();

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
      code: "",
      email: "",
      phone: "",
      active: true,
      roleId: "",
    },
  });

  const navigate = useNavigate();

  const setFooterActions = useCommonStore((state) => state.setFooterActions);
  const setHeaderTitle = useCommonStore((state) => state.setHeaderTitle);
  const resetActions = useCommonStore((state) => state.resetActions);
  const { fetchUser, userEdit, updateUser } = useUserStore();
  const { isLoadingApi } = useCommonStore();
  const { showToast } = useToast();

  useEffect(() => {
    if (userEdit) {
      setValue("code", userEdit.code);
      setValue("email", userEdit.email || "");
      setValue("name", userEdit.name || "");
      setValue("phone", userEdit.phone || "");
      setValue("active", userEdit.active);
      setValue("roleId", userEdit.role?.id?.toString() || "");
    }
  }, [userEdit]);
  console.log("userEdit", userEdit);

  useEffect(() => {
    if (id) {
      fetchUser(id as string);
    }
  }, [id]);

  const onSubmit = async (values: any) => {
    // console.log('values', values);
    // return;
    // const payload: any = {};
    // for (const key in values) {
    //   if (values[key]) {
    //     payload[key] = values[key];
    //   }
    // }
    const transferData = {
      ...values,
      roleId: Number(values.roleId),
    };
    const result = await updateUser(+(id || 0), transferData);
    if (result) {
      showToast({
        severity: "success",
        summary: "Thông báo",
        message: "Cập nhật thành công",
        life: 3000,
      });
      return navigate(pathNames.USER);
    }

    return showToast({
      severity: "error",
      summary: "Thông báo",
      message: "Cập nhật thất bại",
      life: 3000,
    });
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
        // icon: "pi-plus",
      },
    ];
    setFooterActions(actions);
    setHeaderTitle("Chỉnh sửa người dùng");

    return () => {
      resetActions();
    };
  }, []);

  return (
    <div>
      <MyLoading isLoading={isLoadingApi}>
        <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
          {UserFormUpdate.map((form, index) => (
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

export default EditUser;
