import { useEffect } from "react";
import { useCommonStore } from "../../stores";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { useNavigate, useParams } from "react-router-dom";
import useConfirm from "../../hooks/useConfirm";
import {
  notifications,
  notificationSchemas,
} from "../../dataTable/notificationTable";
import { useNotificationStore } from "../../stores/notificationStore";
import { useToast } from "../../hooks/useToast";

const Notification = () => {
  const navigate = useNavigate();
  const { onConfirm } = useConfirm();
  const { setHeaderTitle, setHeaderActions, resetActions } = useCommonStore();
  const { notifications, fetchNotifications, deleteNotification, total } =
    useNotificationStore();
  const { isLoadingApi } = useCommonStore();
  const { showToast } = useToast();
  const handleEdit = (data: any) => {
    navigate(`/notification/edit/${data.id}`);
  };

  const handleDelete = (id: number) => {
    const data = {
      message: "Bạn có chắc chắn muốn xoá thông báo này?",
      header: "Xác nhận xoá",
      onAccept: () => {
        const result = deleteNotification(id);
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

  const actionTable: IActionTable[] = [
    {
      onClick: (data, options) => {
        handleEdit(data);
      },
      tooltip: "Sửa",
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

  useEffect(() => {
    setHeaderTitle("Quản lý Thông báo");
    setHeaderActions([
      {
        title: "Tạo",
        icon: "pi pi-plus",
        onClick: () => {
          navigate(`/notification/create`);
        },
        type: "button",
        disabled: false,
      },
    ]);

    return () => {
      resetActions();
    };
  }, [navigate, resetActions, setHeaderActions, setHeaderTitle]);
  const handleSearch = (query: Object) => {
    fetchNotifications(query);
  };
  return (
    <div>
      <MyTable
        keySearch="name"
        data={notifications.map((item) => ({
          ...item,
          class: item?.class?.name,
        }))}
        schemas={notificationSchemas}
        actions={actionTable}
        totalRecords={total}
        isLoading={isLoadingApi}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Notification;
