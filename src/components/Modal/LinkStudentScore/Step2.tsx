import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useAttendanceStore, useCommonStore } from "../../../stores";
import dayjs from "dayjs";
import { Button } from "primereact/button";
import { useDebounceValue } from "usehooks-ts";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { useExamStore } from "../../../stores/examStore";
import MyLoading from "../../UI/MyLoading";
import { Tag } from "primereact/tag";

type Props = {
  type: string;
  onLink: (id: number) => void;
};
const Step2: React.FC<Props> = ({ type, onLink }) => {
  const { id } = useParams();
  const { attendances, fetchAttendances, total } = useAttendanceStore();
  const [searchText, setSearchText] = useDebounceValue("", 500);
  const { fetchExams, exams, total: totalExams } = useExamStore();
  const [first, setFirst] = useState(1);
  const { isLoadingApi } = useCommonStore();

  const { id: classId } = useParams();

  useEffect(() => {
    setFirst(1);
  }, [type, id]);

  useEffect(() => {
    if (type == "attendance") {
      const query: any = {
        page: first,
        classId,
      };
      if (searchText) {
        query["title"] = searchText;
      }
      fetchAttendances(query);
    }
    if (type == "exam") {
      const query: any = {
        page: first,
        classId,
      };
      if (searchText) {
        query["title"] = searchText;
      }
      fetchExams(query);
    }
  }, [searchText, first]);

  const handlePageChange = (event: PaginatorPageChangeEvent) => {
    const page = Math.max(1, event.page + 1);
    setFirst(page);
  };

  return (
    <MyLoading isLoading={isLoadingApi}>
      {type === "attendance" && (
        <div>
          {attendances?.map((item) => (
            <div className="tw-py-2 tw-border-b tw-flex tw-justify-between tw-items-center">
              <div key={item.id}>
                <p className="tw-font-bold">{item.title}</p>
                <p>
                  {item.class.major.name} - {item.class.name}
                </p>
                <div className="tw-flex tw-items-center tw-gap-2">
                  <span>{dayjs(item.time).format("DD/MM/YYYY HH:mm")}</span>
                  {item.isLink && (
                    <div>
                      <Tag severity={"warning"} value="Đã liên kết" />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <Button
                  onClick={() => onLink(item.id)}
                  label="Liên kết"
                ></Button>
              </div>
            </div>
          ))}
          {attendances?.length == 0 && (
            <div className="tw-text-center">Không có phòng điểm danh nào</div>
          )}
        </div>
      )}
      {type === "exam" && (
        <div>
          {exams?.map((item) => (
            <div
              key={item.id}
              className="tw-py-2 tw-border-b tw-flex tw-justify-between tw-items-center"
            >
              <div>
                <p className="tw-font-bold">{item.title}</p>
                <p>
                  {item.class.major.name} - {item.class.name}
                </p>
                <div className="tw-flex tw-items-center tw-gap-2">
                  <span>
                    {dayjs(item.startTime).format("DD/MM/YYYY HH:mm")} -{" "}
                    {dayjs(item.endTime).format("DD/MM/YYYY HH:mm")}
                  </span>
                  {item.isLink && (
                    <div>
                      <Tag severity={"warning"} value="Đã liên kết" />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <Button
                  onClick={() => onLink(item.id)}
                  label="Liên kết"
                ></Button>
              </div>
            </div>
          ))}
          {exams?.length == 0 && (
            <div className="tw-text-center">Không có bài kiểm tra nào.</div>
          )}
        </div>
      )}
      <Paginator
        first={first * 10 - 1}
        rows={10}
        totalRecords={type === "attendance" ? total : totalExams}
        onPageChange={handlePageChange}
      />
    </MyLoading>
  );
};

export default Step2;
