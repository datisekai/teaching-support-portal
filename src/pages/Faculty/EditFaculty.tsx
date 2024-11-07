import React, { useEffect, useState } from "react";
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
import MyLoading from "../../components/UI/MyLoading";
import { useToast } from "../../hooks/useToast";
const schema = yup
  .object()
  .shape({
    name: yup.string().required("Tên ngành học là bắt buộc."),
    description: yup.string().required("Mô tả ngành học là bắt buộc."),
    code: yup.string().required('Mã ngành học là bắt buộc.'),
  })
  .required();
const EditFaculty = () => {
  const { id } = useParams();
  const { isLoadingApi } = useCommonStore();
  const { faculty, updateFaculty, fetchFaculty } = useFacultyStore();
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
      description: "",
      code: ''
    },
  });

  useEffect(() => {
    fetchFaculty(id || "");
  }, []);
  useEffect(() => {
    if (faculty) {
      setValue("name", faculty.name);
      setValue("description", faculty.description);
      setValue("code", faculty.code);
    }
  }, [faculty]);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const setFooterActions = useCommonStore((state) => state.setFooterActions);
  const setHeaderTitle = useCommonStore((state) => state.setHeaderTitle);
  const resetActions = useCommonStore((state) => state.resetActions);

  const onSubmit = async (data: any) => {
    console.log(data);
    const result = await updateFaculty(parseInt(id || ""), data);
    if (!result) {
      return showToast({
        severity: "danger",
        summary: "Thông báo",
        message: "Sửa thất bại",
        life: 3000,
      });
    }
    showToast({
      severity: "success",
      summary: "Thông báo",
      message: "Sửa thành công",
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
        title: "Lưu thay đổi",
        // icon: "pi-plus",
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
      <MyLoading isLoading={isLoadingApi}>
        <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
          {FacultyForm.map((form, index) => (
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

export default EditFaculty;
