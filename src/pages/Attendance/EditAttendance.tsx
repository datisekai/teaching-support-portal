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
import MyLoading from "../../components/UI/MyLoading";
const schema = yup
  .object()
  .shape({
    title: yup.string().required("Vui lòng điền tiêu đề"),
    expirationTime: yup.number().required("Vui lòng điền thời gian").min(1000),
    classId: yup.string().required("Vui lòng chọn lớp học"),
    time: yup.date(),
    locationId: yup.string().required("Vui lòng chọn vị trí"),
  })
  .required();
const EditAttendance = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      classId: "",
      expirationTime: 3000,
      time: new Date(),
      locationId: "",
    },
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const { showToast } = useToast();
  const { fetchAttendance, attendance, updateAttendance } =
    useAttendanceStore();

  const { setFooterActions, setHeaderTitle, resetActions, isLoadingApi } =
    useCommonStore();

  const onSubmit = async (data: any) => {
    const result = await updateAttendance(parseInt(id || ""), data);
    if (!result) {
      return showToast({
        severity: "danger",
        summary: "Thông báo",
        message: "Cập nhật thất bại",
        life: 3000,
      });
    }
    showToast({
      severity: "success",
      summary: "Thông báo",
      message: "Cập nhật thành công",
      life: 3000,
    });
    navigate(pathNames.ATTENDANCE);
  };

  useEffect(() => {
    if (attendance) {
      setValue("title", attendance.title);
      setValue("classId", attendance.class.id.toString());
      setValue("expirationTime", attendance.expirationTime);
      setValue("time", new Date(attendance.time));
    }
  }, [attendance]);

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
        icon: "pi-plus",
      },
    ];
    setFooterActions(actions);
    setHeaderTitle("Chỉnh sửa phòng");
    fetchAttendance(id || "");

    return () => {
      resetActions();
    };
  }, []);

  return (
    <div>
      <MyLoading isLoading={isLoadingApi}>
        <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
          {AttendanceForm.map((form, index) => (
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

export default EditAttendance;
