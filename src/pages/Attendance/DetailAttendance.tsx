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
import { ISchema } from "yup";
import { TableSchema } from "../../types/table";
import { Checkbox } from "primereact/checkbox";

const DetailAttendance = () => {
  const actionTable: IActionTable[] = [];
  const { id } = useParams();
  const [classId] = useQuery({
    key: "classId",
    defaultValue: "",
  });
  const [hashAttendees, setHashAttendees] = useState<any>({});

  const { getStudentClass, students } = useClassStore();

  const { fetchAttendees, attendees, attendeesUnlimited, toggleAttendee } =
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
  }, [classId]);

  useEffect(() => {
    if (attendees) {
      const hash: any = {};
      attendees.forEach((item: any) => {
        hash[item.user.id] = item.isSuccess;
      });
      setHashAttendees(hash);
    }
  }, [attendees]);

  const data = useMemo(() => {
    return students?.map((item: any) => {
      return item;
    });
  }, [students, hashAttendees]);

  const handleUpdateAttendee = (userId: number, checked: boolean) => {
    toggleAttendee(+(id || 0), userId);
    setHashAttendees({ ...hashAttendees, [userId]: checked });
  };

  const schemas: TableSchema[] = useMemo(() => {
    return [
      {
        label: "#",
        prop: "id",
        type: "number",
      },
      {
        label: "Mã",
        prop: "code",
        type: "number",
      },
      {
        label: "Tên",
        prop: "name",
        type: "text",
      },
      {
        label: "Email",
        prop: "email",
        type: "text",
      },
      {
        label: "Số điện thoại",
        prop: "phone",
        type: "text",
      },
      {
        label: "Vắng",
        prop: "isSuccess",
        type: "text",
        render: (data) => {
          console.log("record", data);
          const isSuccess = hashAttendees?.[data?.id] || false;
          return (
            <Checkbox
              onClick={() => handleUpdateAttendee(data.id, !isSuccess)}
              checked={!isSuccess}
            ></Checkbox>
          );
        },
      },
      {
        label: "Thời gian",
        prop: "createdAt",
        type: "datetime",
      },
    ] as TableSchema[];
  }, [hashAttendees]);

  return (
    <div>
      <MyTable
        data={data}
        isLoading={isLoadingApi}
        schemas={schemas as TableSchema[]}
        actions={actionTable}
      />
    </div>
  );
};

export default DetailAttendance;
