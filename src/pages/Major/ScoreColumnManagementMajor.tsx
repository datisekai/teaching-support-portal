import React, { useEffect, useMemo, useState } from "react";
import MyTableCustom from "../../components/UI/MyTableCustom";
import {
  scoreColumnManagements,
  scoreColumnManagementSchemas,
} from "../../dataTable/scoreColumnManagementTable";
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
import { useClassStore } from "../../stores/classStore";

const ScoreColumnManagementMajor = () => {
  const { id } = useParams();
  const {
    scoreColumn,
    fetchScoreColumn,
    updateScoreColumn,
    createMultiple,
    deleteScoreColumn,
  } = useScoreColumnStore();

  const { setFooterActions, setHeaderTitle, resetActions, isLoadingApi } =
    useCommonStore();
  const { showToast } = useToast();
  const [tableData, setTableData] = useState<any[]>([]);

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

    const scoreColumns = scoreColumn.data?.major?.classes.map((item: any) => ({
      classId: item.id,
      scoreColumns: values,
    }));

    try {
      const result = await createMultiple({ scoreColumns });
      if (!result) {
        showToast({
          severity: "danger",
          summary: "Thông báo",
          message: "Cập nhật thất bại",
          life: 3000,
        });
      } else {
        fetchScoreColumn(id || "");
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
    setTableData(
      scoreColumn?.data?.columns?.length > 0
        ? scoreColumn?.data?.columns?.map((item: any, index: number) => ({
            index: index + 1,
            ...item,
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
    },
  ];
  const { onConfirm } = useConfirm();

  const handleDelete = (data: any, option: any) => {
    const result = {
      message: "Bạn có chắc chắn muốn xoá lớp học này?",
      header: "Xác nhận xoá",
      onAccept: async () => {
        const result = await deleteScoreColumn(data.id);
        if (!result) {
          return showToast({
            severity: "danger",
            summary: "Thông báo",
            message: "Xóa thất bại",
            life: 3000,
          });
        }
        showToast({
          severity: "success",
          summary: "Thông báo",
          message: "Xóa thành công",
          life: 3000,
        });
        setTableData(
          tableData.filter((item: any) => item.index !== data.index)
        );
      },
      onReject: () => {},
    };
    onConfirm(result);
  };

  const headerTable = useMemo(
    () => (
      <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
        <MyCard>
          <div className="md:tw-min-w-[280px]">
            <div>Khoa: {scoreColumn.data?.major?.faculty?.name}</div>

            <div>Mã lớp: {scoreColumn.data?.major?.code}</div>
          </div>
        </MyCard>
        <MyCard className="md:tw-min-w-[280px]">
          <div className="tw-text-end">
            <div>Môn: {scoreColumn.data?.major?.name}</div>
            <div>
              Giảng viên:{" "}
              {scoreColumn.data?.major?.teachers[0]?.name || "Chưa có"}
            </div>
          </div>
        </MyCard>
      </div>
    ),
    [scoreColumn]
  );
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
    <Button text className="tw-w-full" label="Thêm Cột" onClick={handleAdd} />
  );

  return (
    <div>
      <MyTableCustom
        footer={footer}
        headerTable={headerTable}
        isLoading={isLoadingApi}
        data={tableData.map((item: any, index) => ({
          ...item,
          index: index + 1,
        }))}
        schemas={scoreColumnManagementSchemas}
        actions={actionTable}
        setData={setTableData}
        isFooter={true}
        onChange={() => fetchScoreColumn(id || "")}
      />
    </div>
  );
};

export default ScoreColumnManagementMajor;
