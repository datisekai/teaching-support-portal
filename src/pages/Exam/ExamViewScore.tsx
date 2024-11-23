import { useEffect, useMemo, useState } from "react";
import { useCommonStore } from "../../stores";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { useNavigate, useParams } from "react-router-dom";
import { useExamStore } from "../../stores/examStore";
import { exportExcel } from "../../utils/my-export-excel";
import { scoreSchemas } from "../../dataTable/scoreTable";
import { pathNames } from "../../constants";
import { useClassStore } from "../../stores/classStore";
import { useQuery } from "../../hooks/useQuery";
import { InputText } from "primereact/inputtext";
import { useDebounceValue } from "usehooks-ts";

const ExamViewScore = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setHeaderTitle, setHeaderActions, resetActions, isLoadingApi } = useCommonStore();
  const { examHistorys, getHistory } = useExamStore();
  const { getStudentClass, students } = useClassStore()
  const [classId] = useQuery({ key: 'classId', defaultValue: '' })
  const [debouncedValue, setValue] = useDebounceValue('', 500)
  const actionTable: IActionTable[] = useMemo(() => {
    return [
      {
        icon: "pi pi-eye",
        tooltip: "Xem bài làm",
        onClick: (data: any) => {
          navigate(pathNames.EXAM + `/history/${data.exam_id}?userId=${data.user_id}`)
        },
        isHidden: (data: any) => {
          return !(data?.grade != null);
        }
      }
    ]
  }, [])

  useEffect(() => {
    getStudentClass(classId as string, {})
  }, [classId])


  const studentFilter = useMemo(() => {
    if (!debouncedValue || !debouncedValue?.trim()) {
      return students;
    }
    return students?.filter((item: any) => {
      const fullTextSearch = `${item.code} ${item.name}`.toLowerCase();
      return fullTextSearch.includes(debouncedValue.toLowerCase());
    })
  }, [debouncedValue, students])


  useEffect(() => {
    setHeaderTitle("Xem điểm thi");
    setHeaderActions([
      {
        title: "Export",
        icon: "pi pi-file-export",
        onClick: () => {
          exportExcel(
            "Danh sách điểm",
            examHistorys.map((item: any, index: number) => {
              return {
                ...item,
                index: index + 1,
              };
            }),
            scoreSchemas
          );
        },
        type: "button",
        disabled: false,
      },
    ]);
    return () => {
      resetActions();
    };
  }, [setHeaderTitle, setHeaderActions, resetActions, examHistorys]);
  const handleSearch = () => {
    getHistory(id || "");
  };

  const hashExamHistory = useMemo(() => {
    const hash: any = {};
    examHistorys.forEach((item: any) => {
      hash[item.user_id] = item;
    })
    return hash;
  }, [examHistorys])

  return (
    <div>
      <div className="tw-mb-4 tw-shadow-sm">
        <div className={"tw-flex tw-items-end tw-gap-4"}>
          <div>
            <div className={"mb-1"}>Tìm kiếm theo msv, tên</div>
            <InputText onChange={e => setValue(e.target.value)} placeholder="Tìm kiếm" />
          </div>
        </div>
      </div >
      <MyTable
        isLoading={isLoadingApi}
        onChange={handleSearch}
        data={studentFilter?.map((item, index) => ({ ...item, ...hashExamHistory?.[item.id] || {}, index: index + 1 }))}
        schemas={scoreSchemas}
        actions={actionTable}
      />
    </div>
  );
};

export default ExamViewScore;
