import React, { useEffect, useMemo, useState } from "react";
import MyTableCustom from "../../components/UI/MyTableCustom";
import {
  scoreColumnManagements,
  scoreColumnManagementSchemas,
} from "../../dataTable/scoreColumnManagementTable";
import { classes, classSchemas } from "../../dataTable/classTable";
import { IActionTable } from "../../components/UI/MyTable";
import useConfirm from "../../hooks/useConfirm";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useScoreColumnStore } from "../../stores/scoreColumnStore";
import { useCommonStore } from "../../stores";
import { useToast } from "../../hooks/useToast";
import { IAction } from "../../stores/commonStore";
import MyCard from "../../components/UI/MyCard";
import { Button } from "primereact/button";
import CanActivate from "../../components/CanActivate";
import IntroCard from "../../components/UI/IntroCard";
import { useClassStore } from "../../stores/classStore";

const ScoreColumnManagement = () => {
  const { id } = useParams();
  const { scoreColumn, getSingleClass, updateScoreColumn } =
    useScoreColumnStore();
  const { setFooterActions, setHeaderTitle, resetActions, isLoadingApi } =
    useCommonStore();
  const { showToast } = useToast();
  const { _class, fetchClass } = useClassStore();
  const [tableData, setTableData] = useState<any[]>([]);
  console.log("scoreColumn", scoreColumn);
  const onSubmit = async (values: any) => {
    const hasEmptyName = values.some((column: any) => !column.name);
    const totalWeight = values.reduce(
      (sum: number, column: any) => sum + (column.weight || 0),
      0
    ); // Tính tổng trọng số

    if (hasEmptyName) {
      showToast({
        severity: "warning",
        summary: "Thông báo",
        message: "Tên cột không được để trống.",
        life: 3000,
      });
      return;
    }

    // if (totalWeight !== 100) {
    //   showToast({
    //     severity: "warning",
    //     summary: "Thông báo",
    //     message: "Tổng trọng số phải bằng 100.",
    //     life: 3000,
    //   });
    //   return;
    // }

    const data = {
      classId: Number(id),
      scoreColumns: values,
    };

    try {
      const result = await updateScoreColumn(data);
      if (!result) {
        showToast({
          severity: "danger",
          summary: "Thông báo",
          message: "Cập nhật thất bại",
          life: 3000,
        });
      } else {
        getSingleClass(id || "");
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
    if (id) {
      fetchClass(id || "");
    }
  }, [id]);

  useEffect(() => {
    setTableData(
      scoreColumn?.data?.length > 0
        ? scoreColumn?.data?.map((column: any, index: number) => ({
            ...column,
            index: index + 1,
          }))
        : [
            {
              index: 1,
              name: "",
              weight: 100,
            },
          ]
    );
  }, [scoreColumn]);

  useEffect(() => {
    const actions: IAction[] = [
      {
        title: "Trở lại",
        severity: "secondary",
        action: "back",
      },
      {
        onClick: () => onSubmit(tableData),
        title: "Lưu thay đổi",
        icon: "pi-save",
        permission: "score_column:update",
        // icon: "pi-plus",
      },
    ];
    setFooterActions(actions);
    setHeaderTitle("Quản lý cột điểm");

    return () => {
      resetActions();
    };
  }, [resetActions, setHeaderTitle, setFooterActions, tableData]);

  const actionTable: IActionTable[] = [
    {
      onClick: (data, options) => {
        handleDelete(data, options);
      },
      tooltip: "Xóa",
      icon: "pi-trash",
      severity: "danger",
      permission: "score_column:delete",
    },
  ];
  const { onConfirm } = useConfirm();

  const handleDelete = (data: any, option: any) => {
    const result = {
      message: "Bạn có chắc chắn muốn xoá cột điểm này?",
      header: "Xác nhận xoá",
      onAccept: () => {
        setTableData(
          tableData.filter((item: any) => item.index !== data.index)
        );
      },
      onReject: () => {
        console.log("Đã hủy bỏ hành động.");
      },
    };
    onConfirm(result);
  };

  const handleAdd = () => {
    setTableData([
      ...tableData,
      {
        index: tableData.length + 1,
        name: "",
        weight: 0,
      },
    ]);
  };
  const footer = (
    <CanActivate permission="score_column:update">
      <Button text className="tw-w-full" label="Thêm Cột" onClick={handleAdd} />
    </CanActivate>
  );

  return (
    <div>
      {_class && _class?.name && (
        <IntroCard
          data={[
            {
              label: "Lớp học",
              content:
                _class?.major?.code +
                " - " +
                _class?.major?.name +
                " - " +
                _class?.name,
            },
            {
              label: "Giảng viên",
              content: _class?.teachers?.map((item) => item.name).join(", "),
            },
          ]}
        />
      )}
      <MyTableCustom
        footer={footer}
        // headerTable={headerTable}
        isLoading={isLoadingApi}
        data={tableData.map((item: any, index) => ({
          ...item,
          index: index + 1,
        }))}
        schemas={scoreColumnManagementSchemas}
        actions={actionTable}
        setData={setTableData}
        isFooter={true}
        onChange={() => getSingleClass(id || "")}
      />
    </div>
  );
};

export default ScoreColumnManagement;
