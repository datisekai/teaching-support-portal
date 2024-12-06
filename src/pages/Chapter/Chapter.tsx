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
import { useChapterStore } from "../../stores/chapterStore";
import { chapterSchemas } from "../../dataTable/chapterTable";

const Chapter = () => {
  const navigate = useNavigate();
  const { onConfirm } = useConfirm();
  const { setHeaderTitle, setHeaderActions, resetActions } = useCommonStore();
  const { chapters, fetchChapters, total, deleteChapter } = useChapterStore();
  const { isLoadingApi } = useCommonStore();
  const { showToast } = useToast();

  const handleDelete = (id: number) => {
    const data = {
      message: "Bạn có chắc chắn muốn xoá chương này?",
      header: "Xác nhận xoá",
      onAccept: async () => {
        try {
          const result = await deleteChapter(id);
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
        } catch (error) {
          showToast({
            severity: "danger",
            summary: "Thông báo",
            message: "Xóa thất bại",
            life: 3000,
          });
        }
      },
      onReject: () => {},
    };
    onConfirm(data);
  };

  const actionTable: IActionTable[] = [
    {
      onClick: (data, options) => {
        handleDelete(data.id);
      },
      tooltip: "Xóa",
      icon: "pi-trash",
      severity: "danger",
      // permission: "chapter:delete",
    },
  ];

  useEffect(() => {
    setHeaderTitle("Quản lý chương");
    setHeaderActions([
      {
        title: "Tạo",
        icon: "pi pi-plus",
        onClick: () => {
          navigate(`/chapter/create`);
        },
        type: "button",
        disabled: false,
        // permission: "chapter:create",
      },
    ]);

    return () => {
      resetActions();
    };
  }, [navigate, resetActions, setHeaderActions, setHeaderTitle]);
  const handleSearch = (query: Object) => {
    fetchChapters(query);
  };
  return (
    <div>
      <MyTable
        keySearch="name"
        data={chapters}
        schemas={chapterSchemas}
        actions={actionTable}
        totalRecords={total}
        isLoading={isLoadingApi}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Chapter;
