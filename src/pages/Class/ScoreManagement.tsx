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
import { useAttendanceStore, useModalStore } from "../../stores";
import { ModalName } from "../../constants";
import { Tooltip } from "primereact/tooltip";
import MyLoading from "../../components/UI/MyLoading";
import dayjs from "dayjs";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { useDebounceValue } from "usehooks-ts";
import useConfirm from "../../hooks/useConfirm";

const ScoreManagement = () => {
  const { id } = useParams();
  const { fetchstudentScore, studentScore, updatestudentScore } =
    usestudentScoreStore();
  const { fetchScoreColumn, scoreColumn, fetchScoreColumnClass } =
    useScoreColumnStore();

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
  const { attendances, fetchAttendances, toggleAttendee } =
    useAttendanceStore();
  const [hashAttendance, setHashAttendance] = useState<any>({});
  const [debouncedValue, setValue] = useDebounceValue("", 500);

  const [isEdit, setIsEdit] = useState(false);
  const { onToggle } = useModalStore();
  const { onConfirm } = useConfirm();

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

  const handleUpdateManual = () => {
    onConfirm({
      message: "Bạn có chắc chắn muốn lưu thay đổi điểm này?",
      header: "Xác nhận",
      onAccept: async () => {
        const studentScore = [];

        for (const key in hashStudentScore) {
          for (const student of Object.values(hashStudentScore[key])) {
            if ((student as any)?.isEdit) {
              studentScore.push({
                studentId: (student as any)?.studentId,
                score: (student as any)?.score || 0,
                scoreColumnId: (student as any)?.scoreColumnId,
              });
            }
          }
        }

        const result = await updatestudentScore({ studentScore });
        if (!result) {
          return showToast({
            severity: "error",
            summary: "Thông báo",
            message: "Lưu thay đổi thất bại",
          });
        }

        showToast({
          severity: "success",
          summary: "Thông báo",
          message: "Lưu thay đổi thành công",
        });
        setIsEdit(!isEdit);
        fetchstudentScore(id || "");
      },
    });
  };

  useEffect(() => {
    const actions: IAction[] = [
      {
        title: "Trở lại",
        severity: "secondary",
        action: "back",
      },
      {
        title: "Lưu thay đổi",
        icon: "pi-plus",
        onClick: handleUpdateManual,
      },
    ];
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
  }, [
    resetActions,
    setHeaderTitle,
    setFooterActions,
    scoreColumn,
    hashStudentScore,
  ]);

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  const loadData = () => {
    fetchScoreColumnClass(id || "");
    fetchstudentScore(id || "");
    getStudentClass(id || "", {});
    fetchAttendances({ classId: id });
  };

  console.log("hashScore", hashStudentScore);
  useEffect(() => {
    const hash: any = {};
    for (const item of attendances) {
      if (!hash[item.id]) {
        hash[item.id] = {};
      }
      for (const attendee of item.attendees) {
        hash[item.id][attendee.user.code] = attendee.isSuccess;
      }
    }
    setHashAttendance(hash);
  }, [attendances]);

  const getAverage = (score: any = {}, x = 1) => {
    let total = 0;
    for (const key in score) {
      const item = score[key];
      total += item.score * (item?.scoreColumnWeight / 50);
    }
    return (total * x).toFixed(2);
  };

  const tableSchemas = useMemo(() => {
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
      ...[...attendances]?.reverse()?.map((item) => ({
        label: ``,
        renderHeader: () => {
          return (
            <div>
              <div className="tw-flex tw-items-center">
                <Tooltip
                  key={item.id}
                  target={`.custom-tooltip-attendance-${item.id}`}
                >
                  <p> {item.title}</p>
                  <p>{dayjs(item.time).format("DD/MM/YYYY HH:mm")}</p>
                </Tooltip>
                <span>Vắng {dayjs(item.time).format("DD/MM")}</span>
                <i
                  className={`custom-tooltip-attendance-${item.id} pi pi-question-circle tw-ml-2 hover:tw-opacity-50 tw-cursor-pointer`}
                ></i>
              </div>
              <div>{item.isLink && <>(Đã liên kết)</>}</div>
            </div>
          );
        },
        render: (data: any) => {
          return (
            <Checkbox
              onChange={(e) => {
                setHashAttendance({
                  ...hashAttendance,
                  [item.id]: {
                    ...hashAttendance?.[item.id],
                    [data.code]: !e.checked,
                  },
                });
                toggleAttendee(item.id, data.id);
              }}
              checked={!hashAttendance?.[item.id]?.[data.code]}
            ></Checkbox>
          );
        },
        prop: item.id,
        width: 120,
      })),
      ...columns.map((item: any, index: number) => {
        return {
          label: "",
          renderHeader: () => {
            return (
              <div>
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
                <div>({item.weight}%)</div>
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
                value={(
                  hashStudentScore?.[data.code]?.[item.id]?.score ?? 0
                ).toFixed(2)}
                minFractionDigits={2}
                onChange={(e) =>
                  setHashStudentScore({
                    ...hashStudentScore,
                    [data.code]: {
                      ...hashStudentScore[data.code],
                      [item.id]: {
                        ...hashStudentScore[data.code]?.[item.id],
                        score: e.value,
                        isEdit: true,
                      },
                    },
                  })
                }
              />
            ) : (
              `${(hashStudentScore[data.code]?.[item.id]?.score ?? 0).toFixed(
                2
              )}`
            ),
        };
      }),
      {
        label: "Điểm QT ",
        renderHeader: () => {
          return (
            <div>
              <div>Điểm QT </div>
              <div>(50% Hệ 4)</div>
            </div>
          );
        },
        prop: "average",
        width: 150,
        render: (data: any) => getAverage(hashStudentScore[data.code], 0.4),
      },
      {
        label: "Điểm QT (50% Hệ 10)",
        prop: "average10",
        renderHeader: () => {
          return (
            <div>
              <div>Điểm QT </div>
              <div>(50% Hệ 10)</div>
            </div>
          );
        },
        width: 150,
        render: (data: any) => getAverage(hashStudentScore[data.code]),
      },
    ];
  }, [scoreColumn, hashStudentScore, isEdit, hashAttendance, attendances]);

  const studentFilter = useMemo(() => {
    if (!debouncedValue || !debouncedValue?.trim()) {
      return students;
    }
    return students?.filter((item: any) => {
      const fullTextSearch = `${item.code} ${item.name}`.toLowerCase();
      return fullTextSearch.includes(debouncedValue.toLowerCase());
    });
  }, [debouncedValue, students]);

  return (
    <div>
      <div className="tw-flex tw-justify-between tw-mb-2 tw-items-center">
        <div>
          <div className={"mb-1"}>Tìm kiếm theo msv, tên</div>
          <InputText
            onChange={(e) => setValue(e.target.value)}
            placeholder="Tìm kiếm"
          />
        </div>
        <div>
          <Button
            onClick={() => setIsEdit(!isEdit)}
            label={!isEdit ? "Cập nhật" : "Huỷ"}
            icon="pi pi-pencil"
          ></Button>
        </div>
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
          {studentFilter?.map((item: any, index: number) => {
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
