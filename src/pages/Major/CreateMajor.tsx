import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import GroupItem from "../../components/Form/GroupItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useCommonStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
import { MajorForm } from "../../dataForm/majorForm";
import { useToast } from "../../hooks/useToast";
import { useMajorStore } from "../../stores/majorStore";
import { pathNames } from "../../constants";
import { useFacultyStore } from "../../stores/facultyStore";
import MyLoading from "../../components/UI/MyLoading";

const schema = yup.object().shape({
  name: yup.string().required("Tên môn học là bắt buộc."),
  code: yup
    .number()
    .notOneOf([0], "Mã môn học là bắt buộc.")
    .required("Mã môn học là bắt buộc."),
  facultyId: yup.number().required("Ngành học là bắt buộc."),
});

const CreateMajor = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      code: 0,
      facultyId: 0,
    },
  });

  const navigate = useNavigate();
  const { showToast } = useToast();
  const { addMajor } = useMajorStore();
  const { setFooterActions, setHeaderTitle, resetActions, isLoadingApi } =
    useCommonStore();
  const { facultys, fetchFacultys } = useFacultyStore();
  const [facultiesLoaded, setFacultiesLoaded] = useState(false);

  const onSubmit = async (values: any) => {
    const result = await addMajor(values);
    if (!result) {
      showToast({
        severity: "danger",
        summary: "Thông báo",
        message: "Tạo thất bại",
        life: 3000,
      });
      return;
    }
    showToast({
      severity: "success",
      summary: "Thông báo",
      message: "Tạo thành công",
      life: 3000,
    });
    navigate(pathNames.MAJOR);
  };

  useEffect(() => {
    setFooterActions([
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
    ]);
    setHeaderTitle("Tạo môn học");

    fetchFacultys({ limit: 10000 }).then(() => {
      setFacultiesLoaded(true);
    });

    return () => {
      resetActions();
    };
  }, []);

  useEffect(() => {
    if (facultys) {
      const updatedOptions = facultys.map((faculty: any) => ({
        title: faculty.name,
        value: faculty.id,
      }));

      MajorForm[0].attributes.find(
        (attr) => attr.prop === "facultyId"
      )!.options = updatedOptions;
    }
  }, [facultys]);

  return (
    <div>
      <MyLoading isLoading={isLoadingApi || !facultiesLoaded}>
        {facultiesLoaded && (
          <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
            {MajorForm.map((form, index) => (
              <GroupItem
                errors={errors}
                {...form}
                key={index}
                control={control}
              />
            ))}
          </form>
        )}
      </MyLoading>
    </div>
  );
};

export default CreateMajor;
