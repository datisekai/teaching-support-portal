import React from "react";
import MyTableCustom from "../../components/UI/MyTableCustom";
import { students, studentSchemas } from "../../dataTable/student";
import {
  scoreManagerSchemas,
  scoresManager,
} from "../../dataTable/score-manager";

const ScoreManagement = () => {
  return (
    <div>
      <MyTableCustom data={scoresManager} schemas={scoreManagerSchemas} />
    </div>
  );
};

export default ScoreManagement;
