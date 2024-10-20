import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import GroupItem from "../../components/Form/GroupItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { set, useForm } from "react-hook-form";
import { useCommonStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
import { ClassForm } from "../../dataForm/classForm";
import { useClassStore } from "../../stores/classStore";
import { useToast } from "../../hooks/useToast";
import { pathNames } from "../../constants";
import MyLoading from "../../components/UI/MyLoading";
import { useMajorStore } from "../../stores/majorStore";

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Tên lớp học là bắt buộc."),
    duration: yup.string().required("Mô tả lớp học là bắt buộc."),
    teacherCodes: yup
      .array()
      .min(1, "Giảng viên là bắt buộc.")
      .required("Giảng viên là bắt buộc."),
    majorId: yup.string().required("Môn học là bắt buộc."),
  })
  .required();
const EditClass = () => {
  const { id } = useParams();
  const { isLoadingApi } = useCommonStore();
  const { _class, updateClass, fetchClass } = useClassStore();
  const { majors, fetchMajors } = useMajorStore();
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      duration: "",
      majorId: "",
      teacherCodes: [],
    },
  });

  useEffect(() => {
    fetchClass(id || "");
    fetchMajors({ pagination: false }).then(() => setIsLoading(true));
  }, [id]);
  useEffect(() => {
    if (_class) {
      setValue("name", _class.name);
      setValue("duration", _class.duration);
      setValue("majorId", _class?.major?.id.toString());
      setValue(
        "teacherCodes",
        _class?.teachers?.map((item: any) => ({
          title: `${item.code} - ${item.name}`,
          value: item.code,
        }))
      );
    }
  }, [_class]);

  const navigate = useNavigate();
  const { setHeaderTitle, setFooterActions, resetActions } = useCommonStore();
  const { showToast } = useToast();
  const onSubmit = async (data: any) => {
    const formattedData = {
      ...data,
      majorId: Number(data.majorId),
      teacherCodes: data.teacherCodes.map((teacher: any) =>
        Number(teacher.value)
      ),
    };

    const result = await updateClass(parseInt(id || ""), formattedData);
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
    navigate(pathNames.CLASS);
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
    setHeaderTitle("Chỉnh sửa lớp học");

    return () => {
      resetActions();
    };
  }, []);

  return (
    <div>
      <MyLoading isLoading={isLoadingApi || !isLoading}>
        <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
          {ClassForm.map((form, index) => (
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

export default EditClass;
