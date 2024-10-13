import { useEffect, useMemo, useState } from "react";
import { useAttendanceStore, useCommonStore } from "../../stores";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { detailRooms, detailRoomSchemas } from "../../dataTable/detailRoomTable";
import { useParams } from "react-router-dom";


const DetailAttendance = () => {
  const actionTable: IActionTable[] = [];
  const { id } = useParams()

  const { fetchAttendees, attendees } = useAttendanceStore()
  const { setHeaderTitle, setHeaderActions, resetActions, isLoadingApi } = useCommonStore();

  useEffect(() => {
    setHeaderTitle("Chi tiết điểm danh");
    setHeaderActions([]);
    fetchAttendees(id || '')

    return () => {
      resetActions();
    };

  }, []);

  const data = useMemo(() => {
    return attendees?.map(item => ({
      ...item, ...item.user, email: item.user.email || "Chưa có", phone: item.user.phone || "Chưa có"
    }))
  }, [attendees])

  return (
    <div>
      <MyTable
        data={data}
        isLoading={isLoadingApi}
        schemas={detailRoomSchemas}
        actions={actionTable}
      />
    </div>
  );
};

export default DetailAttendance;
