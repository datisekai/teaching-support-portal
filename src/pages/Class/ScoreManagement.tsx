import React from "react";
import MyTableCustom from "../../components/UI/MyTableCustom";
import { students, studentSchemas } from "../../dataTable/studentTable";
import {
  scoreManagerSchemas,
  scoresManager,
} from "../../dataTable/scoreManagerTable";

const ScoreManagement = () => {
  return (
    <div>
      <MyTableCustom data={scoresManager} schemas={scoreManagerSchemas} />
    </div>
  );
};

export default ScoreManagement;
