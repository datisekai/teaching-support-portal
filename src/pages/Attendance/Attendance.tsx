import { useEffect, useMemo, useState } from "react";
import { useAttendanceStore, useCommonStore, useModalStore } from "../../stores";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { facultySchemas, facultys } from "../../dataTable/facultyTable";
import { useNavigate } from "react-router-dom";
import useConfirm from "../../hooks/useConfirm";
import { uploadFile } from "../../utils";
import { rooms, roomSchemas } from "../../dataTable/roomTable";
import { ModalName } from "../../constants";
import { useToast } from "../../hooks/useToast";

const Attendance = () => {
  const { onToggle } = useModalStore();
  const actionTable: IActionTable[] = useMemo(() => {
    return [
      {
        onClick: (data, options) => {
          handleClick(`/attendance/detail/${data.id}`, data);
        },
        tooltip: "Danh sách điểm danh",
        icon: "pi-users",
        severity: "secondary",
      },
      // {
      //   onClick: (data, options) => {
      //     handleClick(`/attendance/logs/${data.id}`, data);
      //   },
      //   tooltip: "Logs",
      //   icon: "pi-cog",
      //   severity: "help",
      // },
      {
        onClick: (data, options) => {
          //TODO
          //Show modal
          onToggle(ModalName.ATTENDANCE, {
            header: "Chi tiết",
            content: data,
          });
        },
        tooltip: "Chi tiết",
        icon: "pi-info-circle",
        severity: "info",
      },
      {
        onClick: (data, options) => {
          handleEdit(data);
        },
        tooltip: "Chỉnh sửa",
        icon: "pi-pencil",
        severity: "warning",
      },
      {
        onClick: (data, options) => {
          handleDelete(data.id);
        },
        tooltip: "Xóa",
        icon: "pi-trash",
        severity: "danger",
      },
    ];
  }, []);
  const navigate = useNavigate();
  const { onConfirm } = useConfirm();
  const { showToast } = useToast()

  const { setHeaderTitle, setHeaderActions, resetActions, isLoadingApi } = useCommonStore();
  const { fetchAttendances, attendances, total, deleteAttendance } = useAttendanceStore()

  const handleEdit = (data: any) => {
    navigate(`/attendance/edit/${data.id}`);
  };
  const handleClick = (endpoint: string, data: any) => {
    console.log(data);
    navigate(endpoint);
  };

  const handleDelete = (id: number) => {
    const data = {
      message: "Bạn có chắc chắn muốn xoá dòng này?",
      header: "Xác nhận xoá",
      onAccept: async () => {
        const result = await deleteAttendance(id);
        if (!result) {
          return showToast({
            severity: "danger",
            summary: "Thông báo",
            message: "Xóa thất bại",
            life: 3000,
          });
        }
        showToast({
          severity: "success",
          summary: "Thông báo",
          message: "Xóa thành công",
          life: 3000,
        });
      },
      onReject: () => {
        console.log("Đã hủy bỏ hành động.");
      },
    };
    onConfirm(data);
  };

  useEffect(() => {
    setHeaderTitle("Quản lý điểm danh");
    setHeaderActions([
      {
        title: "Tạo",
        icon: "pi pi-plus",
        onClick: () => {
          navigate(`/attendance/create`);
        },
        type: "button",
        disabled: false,
      },
    ]);

    return () => {
      resetActions();
    };
  }, []);



  const handleSearch = (query: Object) => {
    fetchAttendances(query)
  };

  const attendanceData = useMemo(() => {
    return attendances.map((item) => {
      return {
        ...item,
        majorName: item.class.major.name,
        teacherNames: item.class.teachers.map(item => item.name).join(", "),
      };
    })
  }, [attendances])
  return (
    <div>
      <MyTable keySearch="title" onChange={handleSearch} data={attendanceData} totalRecords={total}
        isLoading={isLoadingApi} schemas={roomSchemas} actions={actionTable} />
    </div>
  );
};

export default Attendance;
