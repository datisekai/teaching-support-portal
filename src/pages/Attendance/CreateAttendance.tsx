import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { FacultyForm } from "../../dataForm/faculty";
import GroupItem from "../../components/Form/GroupItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { set, useForm } from "react-hook-form";
import { useCommonStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
import { AttendanceForm } from "../../dataForm/attendance";
const schema = yup
  .object()
  .shape({
    name: yup.string().required("Vui lòng điền tiêu đề"),
    description: yup.string().required("Vui lòng điền mô tả"),
    groupId: yup.string().required("Vui lòng chọn lớp học"),
  })
  .required();
const CreateAttendance = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      groupId: "",
    },
  });
  const navigate = useNavigate();

  const { setFooterActions, setHeaderTitle, resetActions } = useCommonStore();

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
        title: "Tạo",
        icon: "pi-plus",
      },
    ];
    setFooterActions(actions);
    setHeaderTitle("Tạo phòng điểm danh");

    return () => {
      resetActions();
    };
  }, []);

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
        {AttendanceForm.map((form, index) => (
          <GroupItem errors={errors} {...form} key={index} control={control} />
        ))}
      </form>
    </div>
  );
};

export default CreateAttendance;
