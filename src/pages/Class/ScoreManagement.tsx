import React, { useEffect, useState } from "react";
import MyTableCustom from "../../components/UI/MyTableCustom";
import { students, studentSchemas } from "../../dataTable/studentTable";
import {
  scoreManagerSchemas,
  scoresManager,
} from "../../dataTable/scoreManagerTable";
import { useScoreColumnStore } from "../../stores/scoreColumnStore";
import { IAction, useCommonStore } from "../../stores/commonStore";
import { useToast } from "../../hooks/useToast";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { usestudentScoreStore } from "../../stores/studentScoreStore";
import { useClassStore } from "../../stores/classStore";
import { exportExcel } from "../../utils/my-export-excel";
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
  const {
    fetchstudentScore,
    studentScore,
    updatestudentScore,
    setstudentScore,
  } = usestudentScoreStore();
  const { fetchScoreColumn, scoreColumn } = useScoreColumnStore();

  const {
    setFooterActions,
    setHeaderTitle,
    resetActions,
    isLoadingApi,
    setHeaderActions,
  } = useCommonStore();
  const { students, getStudentClass } = useClassStore();
  const { showToast } = useToast();
  const [scoreColumnSchema, setScoreColumnSchema] =
    useState(scoreManagerSchemas);

  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);

  const onSubmit = async () => {
    const transformedData = {
      studentScore: tableData.flatMap((item) => {
        // Lọc các cột điểm từ đối tượng và chuyển thành mảng các đối tượng score
        return Object.entries(item)
          .filter(
            ([key]) =>
              !["id", "studentId", "studentName", "total"].includes(key)
          ) // Loại bỏ các trường không phải là điểm
          .map(([scoreColumnId, score]) => ({
            studentId: item.studentId, // Lấy `id` làm `studentId`
            scoreColumnId: Number(scoreColumnId), // Chuyển `scoreColumnId` thành số
            score, // Giá trị điểm
          }));
      }),
    };

    try {
      const result = await updatestudentScore(transformedData);
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
        onClick: () => onSubmit(),
        title: "Lưu thay đổi",
        // icon: "pi-plus",
      },
    ];
    console.log(scoreColumn);
    setHeaderActions([
      {
        title: "Export",
        icon: "pi pi-file-export",
        onClick: () => {
          setHeaderActions([
            {
              title: "Export",
              icon: "pi pi-file-export",
              onClick: () => {
                const _class = scoreColumn?.data?.major?.classes?.find(
                  (item: any) => item.id == id
                );
                if (_class && tableData.length > 0 && scoreColumnSchema) {
                  exportExcel(
                    `Danh sách điểm ${_class.name}`,
                    tableData,
                    scoreColumnSchema
                  );
                }
              },
              type: "button",
              disabled: false,
            },
          ]);
        },
        type: "button",
        disabled: false,
      },
    ]);
    setFooterActions(actions);
    setHeaderTitle("Quản lý cột điểm");

    return () => {
      resetActions();
    };
  }, [resetActions, setHeaderTitle, setFooterActions, tableData, scoreColumn]);

  // useEffect(() => {
  //   if (id) {
  //     fetchstudentScore(id);
  //   }
  // }, [id]);

  const loadData = () => {
    fetchScoreColumn(id || "");
    fetchstudentScore(id || "");
    getStudentClass(id || "");
  };

  useEffect(() => {
    setIsLoading(true);
    const transferdata =
      scoreColumn?.data?.columns.map((item: any, index: number) => {
        return {
          label: item.name,
          prop: item.id,
          type: "number",
          editable: true,
          prefix: "",
        };
      }) || [];
    setScoreColumnSchema([
      ...scoreManagerSchemas,
      ...transferdata,
      {
        label: "Điểm QT",
        prop: "total",
        type: "number",
        editable: true,
        disabled: true,
        prefix: "",
      },
    ]);
    let sum = 0;
    const studentScoreTransferData = students.map(
      (student: any, index: number) => {
        // Tìm tất cả điểm của sinh viên
        const studentScores = studentScore.data?.filter((item: any) => {
          // Kiểm tra điều kiện cho student.id
          return item?.student?.id === student.id;
        });

        // Tạo columnData từ transferdata
        const columnData = transferdata.reduce((acc: any, item1: any) => {
          // Kiểm tra nếu columnId của item bằng prop của item1
          const matchingItem = studentScores?.find(
            (scoreItem: any) => scoreItem.columnId === item1.prop
          );
          sum += matchingItem ? matchingItem.score : 0;

          // Sử dụng cú pháp tính toán cho khóa
          acc[item1.prop] = matchingItem ? matchingItem.score : 0;

          return acc; // Trả về accumulator để tiếp tục
        }, {});

        // console.log("Column Data:", columnData);

        return {
          id: index + 1,
          studentId: student.id,
          studentName: student.name,
          ...columnData, // Thêm dữ liệu điểm vào đối tượng
          total: sum,
        };
      }
    );

    setTableData(studentScoreTransferData);
    setIsLoading(false);
  }, [scoreColumn, students, studentScore]);
  return (
    <div>
      <MyTableCustom
        isLoading={isLoadingApi || isLoading}
        data={tableData}
        schemas={scoreColumnSchema}
        // actions={actionTable}
        setData={setTableData}
        isFooter={true}
        onChange={() => loadData()}
      />
    </div>
  );
};

export default ScoreManagement;
