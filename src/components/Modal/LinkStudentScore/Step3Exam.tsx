import { InputNumber } from "primereact/inputnumber";
import React, { useMemo, useState } from "react";
import { useModalStore } from "../../../stores";
import { useClassStore } from "../../../stores/classStore";
import MyCard from "../../UI/MyCard";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useDebounceValue } from "usehooks-ts";

type Props = {
  hashCurrentScore: any;
  hashScore: any;
  setHashScore: any;
};
const Step3Exam: React.FC<Props> = ({
  hashCurrentScore,
  hashScore,
  setHashScore,
}) => {
  const { content } = useModalStore();
  const { students } = useClassStore();
  const [debouncedValue, setValue] = useDebounceValue("", 500);
  const tableSchemas = useMemo(() => {
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
      {
        label: "Điểm cũ",
        prop: "current_score",
        width: 100,
        render: (data: any) => {
          return (
            <div>
              {hashCurrentScore?.[data.code]?.[content.id]?.score?.toFixed(2) ||
                0}
            </div>
          );
        },
      },
      {
        label: "Điểm mới",
        prop: "new_score",
        width: 100,
        render: (data: any) => {
          return (
            <InputNumber
              minFractionDigits={2}
              min={0}
              max={10}
              className="input-modal-link"
              onValueChange={(e) =>
                setHashScore({
                  ...hashScore,
                  [data.code]: { ...hashScore[data.code], grade: e.value },
                })
              }
              value={hashScore[data.code]?.grade || 0}
            />
          );
        },
      },
      {
        label: "Hành động",
        prop: "action",
        type: "text",
        render(data: any) {
          console.log("data", data);
          const {
            outTabCount = 0,
            mouseRight = 0,
            controlCVX = 0,
          } = hashScore[data.code] || {};
          return (
            <>
              <p>
                <strong>{outTabCount} lần</strong> chuyển tab.
              </p>
              <p>
                <strong>{mouseRight} lần</strong> click chuột phải.
              </p>
              <p>
                <strong>{controlCVX} lần</strong> control C, V, X.
              </p>
            </>
          );
        },
      },
    ];
  }, [hashScore, hashCurrentScore]);

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
      <div className="tw-mb-4 tw-shadow-sm">
        <div className={"tw-flex tw-items-end tw-gap-4"}>
          <div>
            <div className={"mb-1"}>Tìm kiếm theo msv, tên</div>
            <InputText
              onChange={(e) => setValue(e.target.value)}
              placeholder="Tìm kiếm"
            />
          </div>
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
        <div className="tw-max-h-[330px] tw-overflow-y-auto">
          {studentFilter?.map((item: any, index: number) => {
            return (
              <div
                key={item.id}
                className="tw-flex tw-py-4 tw-border-b tw-px-2 tw-items-center"
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

export default React.memo(Step3Exam);
