import { useEffect, useMemo, useState } from "react";
import { useCommonStore } from "../../stores";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { useNavigate, useParams } from "react-router-dom";
import { useExamStore } from "../../stores/examStore";
import { exportExcel } from "../../utils/my-export-excel";
import { exportScoreSchemas, scoreSchemas } from "../../dataTable/scoreTable";
import { pathNames } from "../../constants";
import { useClassStore } from "../../stores/classStore";
import { useQuery } from "../../hooks/useQuery";
import { InputText } from "primereact/inputtext";
import { useDebounceValue } from "usehooks-ts";
import dayjs from "dayjs";
import IntroCard from "../../components/UI/IntroCard";

const ExamViewScore = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setHeaderTitle, setHeaderActions, resetActions, isLoadingApi } =
    useCommonStore();
  const { examHistorys, getHistory } = useExamStore();
  const { getStudentClass, students, classesUnlimited } = useClassStore();
  const [classId] = useQuery({ key: "classId", defaultValue: "" });
  const [debouncedValue, setValue] = useDebounceValue("", 500);
  const actionTable: IActionTable[] = useMemo(() => {
    return [
      {
        icon: "pi pi-eye",
        tooltip: "Xem bài làm",
        onClick: (data: any) => {
          navigate(
            pathNames.EXAM + `/history/${data.exam_id}?userId=${data.user_id}`
          );
        },
        isHidden: (data: any) => {
          return !(data?.grade != null);
        },
      },
    ];
  }, []);

  useEffect(() => {
    getStudentClass(classId as string, {});
  }, [classId]);

  const studentFilter = useMemo(() => {
    if (!debouncedValue || !debouncedValue?.trim()) {
      return students;
    }
    return students?.filter((item: any) => {
      const fullTextSearch = `${item.code} ${item.name}`.toLowerCase();
      return fullTextSearch.includes(debouncedValue.toLowerCase());
    });
  }, [debouncedValue, students]);

  useEffect(() => {
    setHeaderTitle("Xem điểm thi");
    setHeaderActions([
      {
        title: "Export",
        icon: "pi pi-file-export",
        onClick: () => {
          const currentClass = classesUnlimited?.find(
            (item: any) => item.id == classId
          );
          exportExcel(
            "Danh sách điểm",
            students?.map((item, index) => ({
              ...item,
              ...(hashExamHistory?.[item.id] || {}),
              index: index + 1,
            })),
            exportScoreSchemas,
            "Kết quả bài thi",
            `${examHistorys?.exam?.title} - ${dayjs(
              examHistorys?.exam?.createdAt
            ).format("DD/MM/YYYY HH:mm:ss")}`,
            [
              {
                label: "Môn học",
                value: currentClass?.major?.name || "",
              },
              {
                label: "Học phần",
                value: currentClass?.name || "",
              },
            ]
          );
        },
        type: "button",
        disabled: false,
      },
    ]);
    return () => {
      resetActions();
    };
  }, [
    setHeaderTitle,
    setHeaderActions,
    resetActions,
    examHistorys,
    students,
    classesUnlimited,
  ]);
  const handleSearch = () => {
    getHistory(id || "");
  };

  const hashExamHistory = useMemo(() => {
    const hash: any = {};
    examHistorys?.data?.forEach((item: any) => {
      hash[item.user_id] = item;
    });
    return hash;
  }, [examHistorys]);

  return (
    <div>
      {examHistorys?.exam?.class && examHistorys?.exam?.class?.name && (
        <IntroCard
          data={[
            {
              label: "Lớp học",
              content:
                examHistorys?.exam?.class?.major?.code +
                " - " +
                examHistorys?.exam?.class?.major?.name +
                " - " +
                examHistorys?.exam?.class?.name,
            },
            {
              label: "Giảng viên",
              content: examHistorys?.exam?.class?.teachers
                ?.map((item: any) => item.name)
                .join(", "),
            },
            {
              label: "Bài thi",
              content: examHistorys?.exam?.title,
            },
            {
              label: "Thời gian làm bài",
              content: `${examHistorys?.exam?.duration} phút`,
            },
            {
              label: "Thời gian mở",
              content: `${dayjs(examHistorys?.exam?.startTime).format(
                "DD/MM/YYYY HH:mm:ss"
              )} - ${dayjs(examHistorys?.exam?.endTime).format(
                "DD/MM/YYYY HH:mm:ss"
              )}`,
            },
          ]}
        />
      )}
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
      <MyTable
        isLoading={isLoadingApi}
        onChange={handleSearch}
        data={studentFilter?.map((item, index) => ({
          ...item,
          ...(hashExamHistory?.[item.id] || {}),
          index: index + 1,
        }))}
        schemas={scoreSchemas}
        actions={actionTable}
      />
    </div>
  );
};

export default ExamViewScore;
