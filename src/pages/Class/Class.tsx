import { useEffect, useMemo, useRef, useState } from "react";
import { useCommonStore } from "../../stores";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { useNavigate } from "react-router-dom";
import useConfirm from "../../hooks/useConfirm";
import { classes, classSchemas } from "../../dataTable/classTable";
import { uploadFile } from "../../utils";
import { useClassStore } from "../../stores/classStore";
import { useToast } from "../../hooks/useToast";

const Class = () => {
  const actionTable: IActionTable[] = [
    {
      onClick: (data, options) => {
        handleClick(`/class/score/${data.id}`, data);
      },
      tooltip: "Quản lý điểm",
      icon: "pi-box",
      severity: "secondary",
    },
    {
      onClick: (data, options) => {
        handleClick(`/class/score-column-management/${data.id}`, data);
      },
      tooltip: "Quản lý cột điểm",
      icon: "pi-pen-to-square",
      severity: "secondary",
    },
    {
      onClick: (data, options) => {
        handleClick(`/class/statistic/${data.id}`, data);
      },
      tooltip: "Thống kê",
      icon: "pi-chart-bar",
      severity: "help",
    },
    {
      onClick: (data, options) => {
        handleClick(`/student/detail/${data.id}`, data);
      },
      tooltip: "Xem danh sách sinh viên",
      icon: "pi-users",
      severity: "info",
    },
    {
      onClick: (data, options) => {
        handleClick(`/class/edit/${data.id}`, data);
      },
      tooltip: "Sửa",
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
  const navigate = useNavigate();
  const { onConfirm } = useConfirm();

  const { setHeaderTitle, setHeaderActions, resetActions, isLoadingApi } =
    useCommonStore();
  const { classes, total, fetchClasses, deleteClass } = useClassStore();
  const { showToast } = useToast();
  const handleClick = (endpoint: string, data: any) => {
    console.log(data);
    navigate(endpoint);
  };
  const handleDelete = (id: number) => {
    const data = {
      message: "Bạn có chắc chắn muốn xoá lớp học này?",
      header: "Xác nhận xoá",
      onAccept: async () => {
        const result = await deleteClass(id);
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
    setHeaderTitle("Quản lý lớp học");
    setHeaderActions([
      {
        title: "Tạo",
        icon: "pi pi-plus",
        onClick: () => {
          navigate("/class/create");
        },
        type: "button",
        disabled: false,
      },
      {
        title: "Import",
        icon: "pi pi-file-import",
        onClick: async () => {
          const file = await uploadFile();
        },
        type: "file",
        disabled: false,
      },
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

  const handleSearch = (query: Object) => {
    fetchClasses(query);
  };

  return (
    <div>
      <MyTable
        keySearch="name"
        data={classes.map((item) => ({
          ...item,
          // teacher: item.teacher?.name,
          major: item?.major?.name,
        }))}
        schemas={classSchemas}
        actions={actionTable}
        totalRecords={total}
        isLoading={isLoadingApi}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Class;
