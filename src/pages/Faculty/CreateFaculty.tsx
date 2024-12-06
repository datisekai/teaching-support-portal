import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { FacultyForm } from "../../dataForm/facultyForm";
import GroupItem from "../../components/Form/GroupItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { set, useForm } from "react-hook-form";
import { useCommonStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
import { useFacultyStore } from "../../stores/facultyStore";
import { pathNames } from "../../constants";
import { useToast } from "../../hooks/useToast";
const schema = yup
  .object()
  .shape({
    name: yup.string().required("Tên ngành học là bắt buộc."),
    description: yup.string(),
    code: yup.string().required("Mã ngành học là bắt buộc."),
  })
  .required();
const CreateFaculty = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      description: "",
      name: "",
      code: "",
    },
  });
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { faculty, addFaculty } = useFacultyStore();
  const setFooterActions = useCommonStore((state) => state.setFooterActions);
  const setHeaderTitle = useCommonStore((state) => state.setHeaderTitle);
  const resetActions = useCommonStore((state) => state.resetActions);

  const onSubmit = async (values: any) => {
    const result = await addFaculty(values);
    if (!result) {
      return showToast({
        severity: "danger",
        summary: "Thông báo",
        message: "Tạo thất bại",
        life: 3000,
      });
    }
    showToast({
      severity: "success",
      summary: "Thông báo",
      message: "Tạo thành công",
      life: 3000,
    });
    navigate(pathNames.FACULTY);
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
        permission: "faculty:create",
      },
    ];
    setFooterActions(actions);
    setHeaderTitle("Tạo ngành học");

    return () => {
      resetActions();
    };
  }, []);

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
        {FacultyForm.map((form, index) => (
          <GroupItem errors={errors} {...form} key={index} control={control} />
        ))}
      </form>
    </div>
  );
};

export default CreateFaculty;
