import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { useToast } from "../../hooks/useToast";
import { useClassStore } from "../../stores/classStore";
import { IAction, useCommonStore } from "../../stores/commonStore";
import { useScoreColumnStore } from "../../stores/scoreColumnStore";
import { usestudentScoreStore } from "../../stores/studentScoreStore";
import { useModalStore } from "../../stores";
import { ModalName } from "../../constants";
import { Tooltip } from "primereact/tooltip";

const ScoreManagement = () => {
  const { id } = useParams();
  const { fetchstudentScore, studentScore } = usestudentScoreStore();
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
  const [hashStudentScore, setHashStudentScore] = useState<any>({});

  const [isEdit, setIsEdit] = useState(false);
  const { onToggle } = useModalStore();

  useEffect(() => {
    const hash: any = { ...hashStudentScore };
    if (
      !studentScore ||
      !studentScore?.data ||
      (studentScore && studentScore.data && studentScore.data.length == 0)
    )
      return;
    for (const item of studentScore.data) {
      if (!hash[item.studentCode]) {
        hash[item.studentCode] = { [item.scoreColumnId]: item };
      } else {
        hash[item.studentCode][item.scoreColumnId] = item;
      }
    }
    setHashStudentScore(hash);
  }, [studentScore.data]);

  useEffect(() => {
    const actions: IAction[] = [
      {
        title: "Trở lại",
        severity: "secondary",
        action: "back",
      },
      {
        title: "Lưu thay đổi",
        // icon: "pi-plus",
        // onClick: handleSubmit(onSubmit),
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
                // const _class = scoreColumn?.data?.major?.classes?.find(
                //   (item: any) => item.id == id
                // );
                // if (_class && tableData.length > 0 && scoreColumnSchema) {
                //   exportExcel(
                //     `Danh sách điểm ${_class.name}`,
                //     tableData,
                //     scoreColumnSchema
                //   );
                // }
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
    setHeaderTitle("Quản lý điểm");

    return () => {
      resetActions();
    };
  }, [resetActions, setHeaderTitle, setFooterActions, scoreColumn]);

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  const loadData = () => {
    fetchScoreColumn(id || "");
    fetchstudentScore(id || "");
    getStudentClass(id || "", {});
  };

  console.log("students", students);
  console.log("scoreColumn", scoreColumn);
  console.log("studentScore", studentScore);

  const getAverage = (score: any = {}) => {
    let total = 0;
    for (const key in score) {
      const item = score[key];
      total += item.score * (item?.scoreColumnWeight / 100);
    }
    return total.toFixed(2);
  };

  const tableSchemas = useMemo(() => {
    console.log("score", scoreColumn);
    const columns = scoreColumn?.data?.columns || [];
    return [
      {
        label: "#",
        prop: "index",
        width: 40,
        render: (data: any, index: number) => index + 1,
      },
      {
        label: "MSSV",
        prop: "code",
        width: 100,
      },
      {
        label: "Họ và tên",
        prop: "name",
        width: 150,
      },
      ...columns.map((item: any, index: number) => {
        return {
          label: "",
          renderHeader: () => {
            return (
              <div className="tw-flex tw-items-center">
                <span>{item.name}</span>
                <i
                  onClick={() =>
                    onToggle(ModalName.LINK_STUDENT_SCORE, {
                      header: `Liên kết điểm ${item.name}`,
                      content: item,
                    })
                  }
                  className="pi pi-cog tw-ml-2 hover:tw-opacity-50 tw-cursor-pointer"
                ></i>
              </div>
            );
          },
          prop: item.id,
          width: 120,
          render: (data: any) =>
            isEdit ? (
              <InputNumber
                className="input-edit-score"
                min={0}
                max={10}
                value={hashStudentScore[data.code]?.[item.id]?.score ?? 0}
                onValueChange={(e) =>
                  setHashStudentScore({
                    ...hashStudentScore,
                    [data.code]: {
                      ...hashStudentScore[data.code],
                      [item.id]: {
                        ...hashStudentScore[data.code]?.[item.id],
                        score: e.value,
                      },
                    },
                  })
                }
              />
            ) : (
              `${hashStudentScore[data.code]?.[item.id]?.score.toFixed(2) ?? 0}`
            ),
        };
      }),
      {
        label: "Điểm QT",
        prop: "average",
        width: 100,
        render: (data: any) => getAverage(hashStudentScore[data.code]),
      },
    ];
  }, [scoreColumn, hashStudentScore, isEdit]);

  return (
    <div>
      <div className="tw-flex tw-justify-end tw-mb-2">
        <Button
          onClick={() => setIsEdit(!isEdit)}
          label={!isEdit ? "Cập nhật" : "Huỷ"}
          icon="pi pi-pencil"
        ></Button>
      </div>
      <div className="tw-overflow-x-auto">
        <div className="tw-flex tw-bg-[#f9fafb] tw-border-t tw-border-b tw-px-2">
          {tableSchemas.map((item: any, index: number) => {
            return (
              <div
                className="tw-font-bold tw-py-4 tw-text-[#374151]"
                key={item.prop}
                style={{ width: item.width }}
              >
                {item.renderHeader ? item.renderHeader() : item.label}
              </div>
            );
          })}
        </div>
        <div>
          {students?.map((item: any, index: number) => {
            return (
              <div
                key={item.id}
                className="tw-flex tw-py-4 tw-border-b tw-px-2"
              >
                {tableSchemas?.map((cell) => {
                  return (
                    <div
                      key={`${cell.prop}_${item.id}`}
                      style={{ width: cell.width }}
                    >
                      {cell.render
                        ? cell.render(item, index)
                        : item[cell.prop] || ""}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScoreManagement;
