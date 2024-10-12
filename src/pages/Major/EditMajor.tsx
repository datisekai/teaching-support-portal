import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import GroupItem from "../../components/Form/GroupItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useCommonStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
import { MajorForm } from "../../dataForm/major";
import { useToast } from "../../hooks/useToast";
import { useMajorStore } from "../../stores/majorStore";
import { useFacultyStore } from "../../stores/facultyStore";
import { pathNames } from "../../constants";
import MyLoading from "../../components/UI/MyLoading";

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Tên môn học là bắt buộc."),
    code: yup
      .number()
      .notOneOf([0], "Mã môn học là bắt buộc.")
      .required("Mã môn học là bắt buộc."),
    facultyId: yup.number().required("Ngành học là bắt buộc."),
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
    fetchFacultys({ limit: 10000 }).then(() => setIsLoading(true));
  }, [id]);

  useEffect(() => {
    if (major) {
      setValue("name", major.name);
      setValue("code", major.code);
      setValue("facultyId", major.faculty.id);
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

  const onSubmit = (data: any) => {
    const result = updateMajor(parseInt(id || ""), data);
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
    const actions: IAction[] = [
      {
        title: "Trở lại",
        severity: "secondary",
        action: "back",
      },
      {
        onClick: handleSubmit(onSubmit),
        title: "Lưu thay đổi",
      },
    ];
    setFooterActions(actions);
    setHeaderTitle("Chỉnh sửa môn học");

    return () => {
      resetActions();
    };
  }, []);

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
      </MyLoading>
    </div>
  );
};

export default EditMajor;
