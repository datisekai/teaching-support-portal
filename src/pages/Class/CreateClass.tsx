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
import { pathNames } from "../../constants";
import { useToast } from "../../hooks/useToast";
import MyCard from "../../components/UI/MyCard";
import { Avatar } from "primereact/avatar";
import { getImageUrl } from "../../utils";
import MySmartSelect from "../../components/UI/MySmartSelect";
import { ISearchUser } from "../../types/user";
import { apiConfig } from "../../apis";
import { Button } from "primereact/button";

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Tên lớp học là bắt buộc."),
    duration: yup.string().required("Năm học là bắt buộc."),
    majorId: yup.string().required("Môn học là bắt buộc."),
  })
  .required();
const CreateClass = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      duration: "",
      majorId: "",
    },
  });
  const navigate = useNavigate();

  const setFooterActions = useCommonStore((state) => state.setFooterActions);
  const setHeaderTitle = useCommonStore((state) => state.setHeaderTitle);
  const resetActions = useCommonStore((state) => state.resetActions);
  const { classes, fetchClass, addClass } = useClassStore();
  const [teachers, setTeachers] = useState<ISearchUser[]>([]);
  const { showToast } = useToast();
  const onSubmit = async (values: any) => {
    if (teachers?.length == 0) {
      return showToast({
        severity: "error",
        summary: "Thông báo",
        message: "Vui lòng chọn giảng viên",
        life: 3000,
      });
    }

    const transferData = {
      ...values,
      majorId: Number(values.majorId),
      teacherCodes: teachers,
    };
    const result = await addClass(transferData);
    if (!result) {
      return showToast({
        severity: "error",
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
        title: "Tạo",
        icon: "pi-plus",
      },
    ];
    setFooterActions(actions);
    setHeaderTitle("Tạo lớp học");

    return () => {
      resetActions();
    };
  }, [teachers]);

  return (
    <div className="tw-space-y-4">
      <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
        {ClassForm.map((form, index) => (
          <GroupItem errors={errors} {...form} key={index} control={control} />
        ))}
      </form>

      <MyCard title="Giảng viên">
        {teachers &&
          teachers.length > 0 &&
          teachers.map((item: any, index: number) => (
            <div className="tw-py-2 tw-px-4 tw-flex tw-items-center tw-justify-between tw-gap-4  tw-cursor-pointer tw-border-b">
              <div className="tw-flex tw-items-center tw-gap-4">
                <Avatar
                  shape="circle"
                  size="large"
                  image={getImageUrl(item.avatar || "", item.name)}
                />
                <div>
                  <div className="tw-font-bold">{item.name}</div>
                  <div>{item.code}</div>
                </div>
              </div>
              <div>
                <Button
                  text
                  onClick={() => {
                    setTeachers(
                      teachers.filter((t: any) => t.code !== item.code)
                    );
                  }}
                  icon="pi pi-times"
                />
              </div>
            </div>
          ))}
        {teachers.length == 0 && <div>Chưa có giảng viên nào</div>}
        <div className="tw-mt-4">
          <MySmartSelect
            query={{ type: "teacher" }}
            onChange={(value) => {
              const isExisted = teachers.find(
                (item) => item.code === value.code
              );
              if (!isExisted) {
                setTeachers([...teachers, value]);
              }
            }}
            placeholder="Chọn giảng viên"
          />
        </div>
      </MyCard>
    </div>
  );
};

export default CreateClass;
