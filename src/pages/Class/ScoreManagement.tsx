import React, { useEffect } from "react";
import MyTableCustom from "../../components/UI/MyTableCustom";
import { students, studentSchemas } from "../../dataTable/studentTable";
import {
  scoreManagerSchemas,
  scoresManager,
} from "../../dataTable/scoreManagerTable";
import { useScoreColumnStore } from "../../stores/scoreColumnStore";
import { IAction, useCommonStore } from "../../stores/commonStore";
import { useToast } from "../../hooks/useToast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { usestudentScoreStore } from "../../stores/studentScoreStore";
const schema = yup
  .object()
  .shape({
    name: yup.string().required("Tên người dùng là bắt buộc."),
    logo: yup.string().required("Logo phải là bắt buộc."),
    favicon: yup.string().required("Favicon phải là bắt buộc."),
  })
  .required();

const ScoreManagement = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      logo: "",
      favicon: "",
    },
  });
  const { id } = useParams();
  const { fetchstudentScore, studentScore, updatestudentScore } =
    usestudentScoreStore();
  const { setFooterActions, setHeaderTitle, resetActions, isLoadingApi } =
    useCommonStore();
  const { showToast } = useToast();

  const onSubmit = async (values: any) => {
    try {
      const result = await updatestudentScore(values);
      if (!result) {
        showToast({
          severity: "danger",
          summary: "Thông báo",
          message: "Cập nhật thất bại",
          life: 3000,
        });
      } else {
        showToast({
          severity: "success",
          summary: "Thông báo",
          message: "Cập nhật thành công",
          life: 3000,
        });
      }
    } catch (error) {
      showToast({
        severity: "danger",
        summary: "Thông báo",
        message: "Cập nhật thất bại",
        life: 3000,
      });
    }
  };

  useEffect(() => {
    const actions: IAction[] = [
      {
        title: "Trở lại",
        severity: "secondary",
        action: "back",
      },
      {
        onClick: () => onSubmit(""),
        title: "Lưu thay đổi",
        // icon: "pi-plus",
      },
    ];
    setFooterActions(actions);
    setHeaderTitle("Quản lý cột điểm");

    return () => {
      resetActions();
    };
  }, [resetActions, setHeaderTitle, setFooterActions]);

  // useEffect(() => {
  //   if (id) {
  //     fetchstudentScore(id);
  //   }
  // }, [id]);

  return (
    <div>
      <MyTableCustom
        isLoading={isLoadingApi}
        data={studentScore}
        schemas={scoreManagerSchemas}
        // actions={actionTable}
        // setData={setTableData}
        isFooter={true}
        onChange={() => fetchstudentScore(id || "")}
      />
    </div>
  );
};

export default ScoreManagement;
