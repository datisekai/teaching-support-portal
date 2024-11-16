import { useEffect } from "react";
import { useCommonStore } from "../../stores";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { useNavigate, useParams } from "react-router-dom";
import { useExamStore } from "../../stores/examStore";
import { exportExcel } from "../../utils/my-export-excel";
import { scoreSchemas } from "../../dataTable/scoreTable";

const ExamViewScore = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setHeaderTitle, setHeaderActions, resetActions } = useCommonStore();
  const { examHistorys, getHistory } = useExamStore();
  const actionTable: IActionTable[] = [];
  console.log(examHistorys);

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

  return (
    <div>
      <MyTable
        onChange={handleSearch}
        data={examHistorys.map((item: any, index: number) => {
          return {
            ...item,
            index: index + 1,
          };
        })}
        schemas={scoreSchemas}
        actions={actionTable}
      />
    </div>
  );
};

export default ExamViewScore;
