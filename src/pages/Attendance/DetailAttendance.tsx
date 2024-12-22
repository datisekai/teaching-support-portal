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
import dayjs from "dayjs";
import { useUserStore } from "../../stores/userStore";
import IntroCard from "../../components/UI/IntroCard";
import { useDebounceValue } from "usehooks-ts";
import { InputText } from "primereact/inputtext";

const exportSchemas = [
  {
    label: "STT",
    prop: "index",
    type: "number",
  },
  {
    label: "Mã sinh viên",
    prop: "code",
    type: "number",
  },
  {
    label: "Tên sinh viên",
    prop: "name",
    type: "text",
  },
  // {
  //   label: "Email",
  //   prop: "email",
  //   type: "text",
  // },
  // {
  //   label: "Số điện thoại",
  //   prop: "phone",
  //   type: "text",
  // },
  {
    label: "Vắng",
    prop: "isSuccess",
    type: "text",
    render: (data: any) => {
      return !data.isSuccess ? "V" : "";
    },
  },
  {
    label: "Thời gian",
    prop: "updatedAt",
    type: "text",
    render: (data: any) => {
      return dayjs(data.createdAt).format("HH:mm DD/MM/YYYY");
    },
  },
];

const DetailAttendance = () => {
  const actionTable: IActionTable[] = [];
  const { id } = useParams();
  const [classId] = useQuery({
    key: "classId",
    defaultValue: "",
  });
  const [hashAttendees, setHashAttendees] = useState<any>({});
  const { permissions } = useUserStore();
  const [debouncedValue, setValue] = useDebounceValue("", 500);

  const { getStudentClass, students } = useClassStore();

  const {
    fetchAttendees,
    attendees,
    attendeesUnlimited,
    toggleAttendee,
    currentAttendance,
  } = useAttendanceStore();
  const { setHeaderTitle, setHeaderActions, resetActions, isLoadingApi } =
    useCommonStore();

  useEffect(() => {
    setHeaderTitle("Chi tiết điểm danh");

    fetchAttendees(id || "", {});

    return () => {
      resetActions();
    };
  }, []);

  useEffect(() => {
    if (classId) {
      getStudentClass(classId as string, {});
    }
  }, [classId]);

  useEffect(() => {
    if (attendees) {
      const hash: any = {};
      attendees.forEach((item: any) => {
        hash[item.user.id] = {
          isSuccess: item.isSuccess,
          createdAt: item.createdAt,
        };
      });
      setHashAttendees(hash);
    }
  }, [attendees]);

  const studentFilter = useMemo(() => {
    if (!debouncedValue || !debouncedValue?.trim()) {
      return students;
    }
    return students?.filter((item: any) => {
      const fullTextSearch = `${item.code} ${item.name}`.toLowerCase();
      return fullTextSearch.includes(debouncedValue.toLowerCase());
    });
  }, [debouncedValue, students]);

  const data = useMemo(() => {
    return studentFilter?.map((item: any) => {
      return item;
    });
  }, [studentFilter, hashAttendees]);

  const handleUpdateAttendee = (userId: number, checked: boolean) => {
    toggleAttendee(+(id || 0), userId);
    setHashAttendees({
      ...hashAttendees,
      [userId]: { ...hashAttendees?.[userId], isSuccess: checked },
    });
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
      // {
      //   label: "Email",
      //   prop: "email",
      //   type: "text",
      // },
      // {
      //   label: "Số điện thoại",
      //   prop: "phone",
      //   type: "text",
      // },
      {
        label: "Vắng",
        prop: "isSuccess",
        type: "text",
        render: (data) => {
          const isSuccess = hashAttendees?.[data?.id]?.isSuccess || false;
          return (
            <Checkbox
              onClick={() => handleUpdateAttendee(data.id, !isSuccess)}
              checked={!isSuccess}
              disabled={!permissions.includes("attendance:update")}
            ></Checkbox>
          );
        },
      },
      {
        label: "Thời gian",
        prop: "createdAt",
        type: "datetime",
        render(data) {
          const createdAt = hashAttendees?.[data?.id]?.createdAt;
          return dayjs(createdAt).format("DD/MM/YYYY HH:mm:ss");
        },
      },
    ] as TableSchema[];
  }, [hashAttendees]);

  useEffect(() => {
    setHeaderActions([
      {
        title: "Export",
        icon: "pi pi-file-export",
        onClick: async () => {
          const headerContent = "Chi tiết điểm danh";

          exportExcel(
            "Danh sách điểm danh",
            students.map((item: any, index: number) => {
              return {
                ...item,
                isSuccess: hashAttendees?.[item?.id] || false,
                index: index + 1
              };
            }),
            exportSchemas,
            headerContent,
            `${currentAttendance?.title} - ${dayjs(
              currentAttendance?.time
            ).format("DD/MM/YYYY HH:mm:ss")}`
          );
        },
        type: "button",
        disabled: false,
      },
    ]);
  }, [students, hashAttendees, currentAttendance]);

  return (
    <div>
      {currentAttendance && currentAttendance?.title && (
        <IntroCard
          data={[
            {
              label: "Lớp học",
              content:
                currentAttendance.class?.major?.code +
                " - " +
                currentAttendance.class?.major?.name +
                " - " +
                currentAttendance.class?.name,
            },
            {
              label: "Giảng viên",
              content: currentAttendance?.user?.name,
            },
            {
              label: "Điểm danh",
              content: currentAttendance?.title,
            },
            {
              label: "Thời gian điểm danh",
              content: dayjs(currentAttendance?.time).format(
                "DD/MM/YYYY HH:mm:ss"
              ),
            },
          ]}
        />
      )}
      <div className="tw-space-y-4">
        <div>
          <div className={"mb-1"}>Tìm kiếm theo msv, tên</div>
          <InputText
            onChange={(e) => setValue(e.target.value)}
            placeholder="Tìm kiếm"
          />
        </div>
        <MyTable
          data={data}
          isLoading={isLoadingApi}
          schemas={schemas as TableSchema[]}
          actions={actionTable}
        />
      </div>
    </div>
  );
};

export default DetailAttendance;
