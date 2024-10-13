import { useEffect } from "react";
import { useCommonStore } from "../../stores";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { useNavigate } from "react-router-dom";
import { scores, scoreSchemas } from "../../dataTable/scoreTable";

const ExamViewScore = () => {
  const navigate = useNavigate();

  const { setHeaderTitle, setHeaderActions, resetActions } = useCommonStore();

  const actionTable: IActionTable[] = [];

  useEffect(() => {
    setHeaderTitle("Xem điểm thi");
    setHeaderActions([
      {
        title: "Export",
        icon: "pi pi-file-export",
        onClick: () => {
          console.log("a");
        },
        type: "button",
        disabled: false,
      },
    ]);
    return () => {
      resetActions();
    };
  }, []);

  return (
    <div>
      <MyTable data={scores} schemas={scoreSchemas} actions={actionTable} />
    </div>
  );
};

export default ExamViewScore;
