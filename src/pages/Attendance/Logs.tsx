import { useEffect, useState } from "react";
import { useCommonStore } from "../../stores";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { detailRooms, detailRoomSchemas } from "../../dataTable/detailRoom";

const Logs = () => {
  const actionTable: IActionTable[] = [];

  const { setHeaderTitle, setHeaderActions, resetActions } = useCommonStore();

  useEffect(() => {
    setHeaderTitle("Logs điểm danh");
    setHeaderActions([]);

    return () => {
      resetActions();
    };
  }, []);

  return (
    <div>
      <MyTable
        data={detailRooms}
        schemas={detailRoomSchemas}
        actions={actionTable}
      />
    </div>
  );
};

export default Logs;
