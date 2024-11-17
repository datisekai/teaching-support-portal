import { Button } from "primereact/button";
import { PickList, PickListChangeEvent } from "primereact/picklist";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import React, { ReactNode, useState, useEffect } from "react";
import { useDebounceValue } from "usehooks-ts";
import MyLoading from "./MyLoading";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";

export interface ISource {
  id: number;
  content: string;
  subcontent?: ReactNode;
  score?: number;
  detail?: any;
}

interface IMyPickList {
  source: ISource[];
  target: ISource[];
  onChange: (event: PickListChangeEvent) => void;
  onChangeLoadData?: (query: Object) => void;
  handleOpenModal?: (data: any) => void;
  perPage?: number;
  totalRecords?: number;
  keySearch: string;
  isLoading?: boolean;
}

const MyPickList: React.FC<IMyPickList> = ({
  source,
  target,
  onChange,
  keySearch = "",
  handleOpenModal,
  onChangeLoadData,
  perPage = 10,
  totalRecords = 0,
  isLoading = false,
}) => {
  const [first, setFirst] = useState(1);
  const [debouncedValue, setValue] = useDebounceValue("", 500);
  const [remainingPoints, setRemainingPoints] = useState(10);

  useEffect(() => {
    const totalScore = target.reduce(
      (sum, item) => sum + (item.score || 0.25),
      0
    );
    setRemainingPoints(10 - totalScore);
  }, [target]);

  const handlePageChange = (event: PaginatorPageChangeEvent) => {
    const page = Math.max(1, event.page + 1);
    setFirst(page);
  };

  const updateScore = (id: number, value: number | null) => {
    const updatedTarget = target.map((item) =>
      item.id === id ? { ...item, score: value ?? 0 } : item
    );
    onChange({ source, target: updatedTarget, originalEvent: null as any });
  };

  const distributePointsEvenly = () => {
    const remaining = 10; // Total points available
    const equalShare = remaining / target.length; // Calculate equal share for each item

    if (target.length > 0) {
      const updatedTarget = target.map((item) => ({
        ...item,
        score: equalShare,
      }));
      onChange({ source, target: updatedTarget, originalEvent: null as any });
      setRemainingPoints(0); // All points are distributed evenly, so remaining points are zero
    }
  };

  useEffect(() => {
    if (onChangeLoadData && typeof onChangeLoadData === "function") {
      onChangeLoadData({ [keySearch]: debouncedValue, page: first });
    }
  }, [debouncedValue, first]);

  const itemTemplate = (item: ISource) => {
    const itemScore = item.score ?? 0.25;
    const isInTarget = target.some((targetItem) => targetItem.id === item.id);

    return (
      <div className="tw-flex tw-items-center tw-justify-between">
        <div>
          <div className="tw-font-bold tw-truncate tw-w-[320px]">
            {item.content}
          </div>
          <div className="tw-text-xs tw-truncate tw-w-[320px]">
            {item.subcontent}
          </div>
        </div>
        <div className="tw-flex tw-items-center">
          {isInTarget && (
            <InputNumber
              inputId={`score-${item.id}`}
              value={itemScore}
              onValueChange={(e: InputNumberValueChangeEvent) => {
                // Provide a fallback of `null` if `e.value` is `undefined`
                updateScore(item.id, e.value ?? null);
              }}
              mode="decimal"
              showButtons
              step={0.25}
              min={0}
              max={10}
            />
          )}
          {item.detail && handleOpenModal && (
            <i
              onClick={() => handleOpenModal(item.detail)}
              className="pi pi-ellipsis-v tw-ml-2"
            ></i>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <MyLoading isLoading={isLoading}>
        <PickList
          dataKey="id"
          source={source}
          target={target}
          onChange={onChange}
          itemTemplate={itemTemplate}
          filter
          filterBy="content"
          sourceHeader={`Chưa chọn (${source.length})`}
          targetHeader={
            <div className="tw-flex tw-items-center tw-justify-between">
              <div>Đã chọn ({target.length})</div>
              <div className="tw-flex tw-items-center">
                <div>Số điểm còn lại: {remainingPoints}</div>
                <Button
                  tooltip="Tự động chia đều điểm"
                  tooltipOptions={{ position: "left" }}
                  icon="pi pi-sliders-h"
                  onClick={distributePointsEvenly}
                  className="tw-ml-2"
                />
              </div>
            </div>
          }
          sourceStyle={{ height: "24rem" }}
          targetStyle={{ height: "24rem" }}
          sourceFilterPlaceholder="Tìm kiếm nội dung"
          targetFilterPlaceholder="Tìm kiếm nội dung"
          breakpoint="1280px"
        />

        {totalRecords > perPage && (
          <Paginator
            first={first * perPage - 1}
            rows={perPage}
            totalRecords={totalRecords}
            onPageChange={handlePageChange}
          />
        )}
      </MyLoading>
    </div>
  );
};

export default MyPickList;
