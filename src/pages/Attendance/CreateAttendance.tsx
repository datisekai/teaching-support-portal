import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { FacultyForm } from "../../dataForm/facultyForm";
import GroupItem from "../../components/Form/GroupItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { set, useForm } from "react-hook-form";
import { useAttendanceStore, useCommonStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
import { AttendanceForm } from "../../dataForm/attendanceForm";
import { useToast } from "../../hooks/useToast";
import { pathNames } from "../../constants";
const schema = yup
  .object()
  .shape({
    title: yup.string().required("Vui lòng điền tiêu đề"),
    expirationTime: yup.number().required("Vui lòng điền thời gian").min(1000),
    classId: yup.string().required("Vui lòng chọn lớp học"),
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
      title: "",
      classId: "",
      expirationTime: 3000,
    },
  });
  const navigate = useNavigate();
  const { addAttendance } = useAttendanceStore()

  const { setFooterActions, setHeaderTitle, resetActions } = useCommonStore();
  const { showToast } = useToast()

  const onSubmit = async (values: any) => {
    const result = await addAttendance(values);
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
    navigate(pathNames.ATTENDANCE);
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
