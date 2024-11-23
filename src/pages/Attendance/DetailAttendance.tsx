import { useEffect, useMemo, useState } from "react";
import { useAttendanceStore, useCommonStore } from "../../stores";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import {
  detailRooms,
  detailRoomSchemas,
} from "../../dataTable/detailRoomTable";
import { useParams } from "react-router-dom";
import { exportExcel } from "../../utils/my-export-excel";
import { useClassStore } from "../../stores/classStore";
import { useQuery } from "../../hooks/useQuery";

const DetailAttendance = () => {
  const actionTable: IActionTable[] = [];
  const { id } = useParams();
  const [classId] = useQuery({
    key: 'classId',
    defaultValue: ""
  })

  const { getStudentClass, students } = useClassStore()

  const { fetchAttendees, attendees, attendeesUnlimited } =
    useAttendanceStore();
  const { setHeaderTitle, setHeaderActions, resetActions, isLoadingApi } =
    useCommonStore();

  useEffect(() => {
    setHeaderTitle("Chi tiết điểm danh");
    setHeaderActions([
      {
        title: "Export",
        icon: "pi pi-file-export",
        onClick: async () => {
          const headerContent = "Chi tiết điểm danh";

          await fetchAttendees(id || "", { pagination: false });
          exportExcel(
            "Danh sách điểm danh",
            attendeesUnlimited.map((item: any, index: number) => {
              return {
                ...item,
                ...item.user,
                email: item.user.email || "Chưa có",
                phone: item.user.phone || "Chưa có",
              };
            }),
            detailRoomSchemas,

            headerContent
          );
        },
        type: "button",
        disabled: false,
      },
    ]);
    fetchAttendees(id || "", {});

    return () => {
      resetActions();
    };
  }, []);

  useEffect(() => {
    if (classId) {
      // console.log('classId', classId);
      getStudentClass(classId as string, {});
    }
  }, [classId])

  const data = useMemo(() => {
    return attendees?.map((item) => ({
      ...item,
      ...item.user,
      email: item.user.email || "Chưa có",
      phone: item.user.phone || "Chưa có",
    }));
  }, [attendees]);

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
