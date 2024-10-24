import React, { useEffect, useState } from "react";
import MyTableCustom from "../../components/UI/MyTableCustom";
import {
  scoreColumnManagements,
  scoreColumnManagementSchemas,
} from "../../dataTable/scoreColumnManagementTable";
import { classes, classSchemas } from "../../dataTable/classTable";
import { IActionTable } from "../../components/UI/MyTable";
import useConfirm from "../../hooks/useConfirm";

const ScoreColumnManagement = () => {
  const [tableData, setTableData] = useState(scoreColumnManagements);
  useEffect(() => {
    setTableData(
      scoreColumnManagements.length > 0
        ? scoreColumnManagements
        : [
            {
              index: 1,
              name: "",
              percent: 100,
            },
          ]
    );
  }, [scoreColumnManagements]);

  const actionTable: IActionTable[] = [
    {
      onClick: (data, options, index) => {
        console.log("click", data, options, index);
        handleDelete(data, options, index);
      },
      tooltip: "Xóa",
      icon: "pi-trash",
      severity: "danger",
    },
  ];
  const { onConfirm } = useConfirm();

  const handleDelete = (data: any, option: any, index?: number) => {
    const result = {
      message: "Bạn có chắc chắn muốn xoá lớp học này?",
      header: "Xác nhận xoá",
      onAccept: () => {
        setTableData(tableData.filter((item) => item.index !== index));
      },
      onReject: () => {
        console.log("Đã hủy bỏ hành động.");
      },
    };
    onConfirm(result);
  };
  return (
    <div>
      <MyTableCustom
        data={tableData}
        schemas={scoreColumnManagementSchemas}
        actions={actionTable}
        isFooter={true}
      />
    </div>
  );
};

export default ScoreColumnManagement;
