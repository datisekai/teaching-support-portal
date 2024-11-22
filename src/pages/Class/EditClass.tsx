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
import MyCard from "../../components/UI/MyCard";
import { ISearchUser } from "../../types/user";
import { Avatar } from "primereact/avatar";
import { getImageUrl } from "../../utils";
import { Button } from "primereact/button";
import MySmartSelect from "../../components/UI/MySmartSelect";

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Tên lớp học là bắt buộc."),
    duration: yup.string().required("Mô tả lớp học là bắt buộc."),
    majorId: yup.string().required("Môn học là bắt buộc."),
  })
  .required();
const EditClass = () => {
  const { id } = useParams();
  const { isLoadingApi } = useCommonStore();
  const { _class, updateClass, fetchClass } = useClassStore();
  const { majors, fetchMajors } = useMajorStore();
  const [isLoading, setIsLoading] = useState(false);
  const [teachers, setTeachers] = useState<ISearchUser[]>([]);
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
      setTeachers(
        _class?.teachers.map((item) => ({
          code: item.code,
          name: item.name,
          avatar: item.avatar,
        }))
      );
    }
  }, [_class]);

  const navigate = useNavigate();
  const { setHeaderTitle, setFooterActions, resetActions } = useCommonStore();
  const { showToast } = useToast();
  const onSubmit = async (data: any) => {
    if (teachers?.length == 0) {
      return showToast({
        severity: "error",
        summary: "Thông báo",
        message: "Vui lòng chọn giảng viên",
        life: 3000,
      });
    }

    const formattedData = {
      ...data,
      majorId: Number(data.majorId),
      teacherCodes: teachers,
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
  }, [teachers]);

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

        <div className="tw-mt-4">
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
      </MyLoading>
    </div>
  );
};

export default EditClass;
