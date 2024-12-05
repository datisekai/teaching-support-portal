import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import GroupItem from "../../components/Form/GroupItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useCommonStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
import { MajorForm } from "../../dataForm/majorForm";
import { useToast } from "../../hooks/useToast";
import { useMajorStore } from "../../stores/majorStore";
import { useFacultyStore } from "../../stores/facultyStore";
import { pathNames } from "../../constants";
import MyLoading from "../../components/UI/MyLoading";
import { ISearchUser } from "../../types/user";
import MyCard from "../../components/UI/MyCard";
import { Avatar } from "primereact/avatar";
import { getImageUrl } from "../../utils";
import { Button } from "primereact/button";
import MySmartSelect from "../../components/UI/MySmartSelect";

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Tên môn học là bắt buộc."),
    code: yup
      .number()
      .notOneOf([0], "Mã môn học là bắt buộc.")
      .required("Mã môn học là bắt buộc."),
    facultyId: yup
      .number()
      .notOneOf([0], "Ngành học là bắt buộc.")
      .required("Ngành học là bắt buộc."),
  })
  .required();

const EditMajor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { setHeaderTitle, setFooterActions, resetActions } = useCommonStore();
  const { major, updateMajor, fetchMajor } = useMajorStore();
  const { facultys, fetchFacultys } = useFacultyStore();
  const [facultyOptions, setFacultyOptions] = useState<any>([]);
  const { isLoadingApi } = useCommonStore();
  const [isLoading, setIsLoading] = useState(false);
  const [teachers, setTeachers] = useState<ISearchUser[]>([]);
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
      code: 0,
      facultyId: 0, // Using facultyId instead of faculty name
    },
  });

  useEffect(() => {
    fetchMajor(id || "");
    fetchFacultys({ pagination: false }).then(() => setIsLoading(true));
  }, [id]);

  useEffect(() => {
    if (major) {
      setValue("name", major.name);
      setValue("code", major.code);
      setValue("facultyId", major?.faculty?.id);
      setTeachers(
        major?.teachers?.map((item) => ({
          code: item.code,
          name: item.name,
          avatar: item.avatar,
        }))
      );
    }
    if (facultys) {
      const updatedOptions = facultys.map((faculty: any) => ({
        title: faculty.name,
        value: faculty.id,
      }));

      MajorForm[0].attributes.find(
        (attr) => attr.prop === "facultyId"
      )!.options = updatedOptions;
    }
  }, [major, facultys]);

  const onSubmit = async (data: any) => {
    const result = await updateMajor(parseInt(id || ""), { ...data, teachers });
    if (!result) {
      showToast({
        severity: "danger",
        summary: "Thông báo",
        message: "Cập nhật thất bại!",
        life: 3000,
      });
    }
    showToast({
      severity: "success",
      summary: "Thông báo",
      message: "Cập nhật thành công!",
      life: 3000,
    });
    navigate(pathNames.MAJOR);
  };

  useEffect(() => {
    setHeaderTitle("Chỉnh sửa môn học");

    return () => {
      resetActions();
    };
  }, []);

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
        permission: "major:update",
      },
    ];
    setFooterActions(actions);
  }, [teachers]);

  return (
    <div>
      <MyLoading isLoading={isLoadingApi || !isLoading}>
        {isLoading && (
          <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
            {MajorForm.map((form, index) => (
              <GroupItem
                errors={errors}
                {...form}
                key={index}
                control={control}
                {...(form.attributes.find(
                  (attr) => attr.prop === "facultyId"
                ) && {
                  options: facultyOptions,
                })}
              />
            ))}
          </form>
        )}

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

export default EditMajor;
