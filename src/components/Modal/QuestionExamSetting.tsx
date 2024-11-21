import React, { useEffect, useMemo, useState } from "react";
import { useModalStore } from "../../stores";
import { IQuestion } from "../../types/question";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { getQuestionTypeText } from "../../utils";

const QuestionExamSetting = () => {
  const { content } = useModalStore();
  const [hashScore, setHashScore] = useState<any>({});

  const sumScore = useMemo(() => {
    return Object.values(hashScore).reduce(
      (pre: any, cur: any) => pre + +cur,
      0
    ) as number;
  }, [hashScore]);

  useEffect(() => {
    if (content?.hash) {
      setHashScore(content.hash);
    } else {
      if (content && content?.questions) {
        const hash: any = {};
        content.questions.forEach((item: IQuestion) => {
          hash[item.id] = (10 / content.questions.length).toFixed(2);
        });
        setHashScore(hash);
      }
    }
  }, [content]);

  const disabled = useMemo(() => {
    return (
      Object.values(hashScore).reduce((pre: any, cur: any) => pre + +cur, 0) !==
        10 || Object.values(hashScore).some((item: any) => item < 0)
    );
  }, [hashScore]);

  const handleApply = () => {
    if (content?.onApply && typeof content.onApply === "function") {
      content.onApply(hashScore);
    }
  };

  return (
    <div>
      <div className="tw-flex">
        <div className="tw-w-full md:tw-w-[70%] px-2 tw-space-y-2 tw-max-h-[500px] tw-overflow-y-auto">
          {content?.questions?.map((item: IQuestion, index: number) => (
            <div
              key={item.id}
              className="tw-border tw-shadow-sm tw-px-4 tw-py-2 tw-rounded tw-flex tw-justify-between tw-items-center tw-w-full"
            >
              <div>
                <div className="tw-font-bold tw-line-clamp-1">
                  {index + 1}. {item.title}
                </div>
                <div className="tw-flex tw-items-center tw-gap-x-2 tw-flex-wrap">
                  <p>
                    Chương:{" "}
                    <span className="text-primary">{item.chapter.name}</span>
                  </p>
                  <p>
                    Độ khó:{" "}
                    <span className="text-primary">
                      {item.difficulty.level}
                    </span>
                  </p>
                  <p>
                    Loại:{" "}
                    <span className="text-primary">
                      {getQuestionTypeText(item.type)}
                    </span>
                  </p>
                </div>
              </div>
              <div className="tw-flex tw-items-center tw-gap-2">
                <div>
                  <div>Điểm</div>
                  <InputNumber
                    value={hashScore[item.id]}
                    onChange={(e) =>
                      setHashScore({ ...hashScore, [item.id]: e.value })
                    }
                    className="tw-w-[80px]"
                    inputClassName="tw-w-[80px]"
                    minFractionDigits={2}
                  />
                </div>
                <div>
                  <div className="tw-h-5"></div>
                  <Button
                    severity="warning"
                    icon="pi pi-sliders-v"
                    onClick={() => {
                      const newScore =
                        10 - sumScore + (hashScore[item.id] || 0);
                      setHashScore({ ...hashScore, [item.id]: newScore });
                    }}
                    tooltip="Điểm còn lại"
                  ></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="tw-w-full md:tw-w-[30%] md:tw-border-l-2 md:tw-pl-4">
          <p>
            <strong>Tổng cộng: </strong>10 điểm
          </p>
          <p className={`${sumScore > 10 ? "tw-text-red-500" : ""}`}>
            <strong>Đã dùng: </strong> {sumScore.toFixed(2)} điểm
          </p>
          <p>
            <strong>Còn lại:</strong>
            {(10 - (sumScore as number)).toFixed(2)}%
          </p>
        </div>
      </div>
      <div className="tw-mt-8">
        Bạn đang thiết lập điểm, ấn <strong>Lưu thay đổi</strong> để cập nhật
      </div>
      <div className="tw-flex tw-justify-end tw-mt-8">
        <Button
          onClick={handleApply}
          disabled={disabled}
          icon={"pi pi-save"}
          label="Lưu thay đổi"
        ></Button>
      </div>
    </div>
  );
};

export default QuestionExamSetting;
