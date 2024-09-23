import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { DepartmentForm } from "../../dataForm/department";
import GroupItem from "../../components/Form/GroupItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { set, useForm } from "react-hook-form";
import { useCommonStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
const schema = yup
  .object()
  .shape({
    name: yup.string().required("Tên ngành học là bắt buộc."),
    description: yup.string().required("Mô tả ngành học là bắt buộc."),
  })
  .required();
const CreateDepartment = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      description: "",
      name: "",
    },
  });
  const navigate = useNavigate();

  const setFooterActions = useCommonStore((state) => state.setFooterActions);
  const setHeaderTitle = useCommonStore((state) => state.setHeaderTitle);
  const resetActions = useCommonStore((state) => state.resetActions);

  const onSubmit = () => {
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
        title: "Sửa ngành học",
        icon: "pi-plus",
      },
    ];
    setFooterActions(actions);
    setHeaderTitle("Chỉnh sửa ngành học");

    return () => {
      resetActions();
    };
  }, []);

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
        {DepartmentForm.map((form, index) => (
          <GroupItem errors={errors} {...form} key={index} control={control} />
        ))}
      </form>
    </div>
  );
};

export default CreateDepartment;
