import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { difficultySchemas } from "../../dataTable/difficultyTable";
import useConfirm from "../../hooks/useConfirm";
import { useToast } from "../../hooks/useToast";
import { useCommonStore } from "../../stores";
import { useDifficultyStore } from "../../stores/difficultStore";

const Difficulty = () => {
  const navigate = useNavigate();
  const { onConfirm } = useConfirm();
  const { setHeaderTitle, setHeaderActions, resetActions } = useCommonStore();
  const { difficultys, fetchDifficultys, total, deleteDifficulty } =
    useDifficultyStore();
  const { isLoadingApi } = useCommonStore();
  const { showToast } = useToast();

  const handleDelete = (id: number) => {
    const data = {
      message: "Bạn có chắc chắn muốn xoá độ khó này?",
      header: "Xác nhận xoá",
      onAccept: async () => {
        try {
          const result = await deleteDifficulty(id);
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
      onReject: () => {
        console.log("Đã hủy bỏ hành động.");
      },
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
      permission: "difficulty:delete",
    },
  ];

  useEffect(() => {
    setHeaderTitle("Quản lý chương");
    setHeaderActions([
      {
        title: "Tạo",
        icon: "pi pi-plus",
        onClick: () => {
          navigate(`/difficulty/create`);
        },
        type: "button",
        disabled: false,
        permission: "difficulty:create",
      },
    ]);

    return () => {
      resetActions();
    };
  }, [navigate, resetActions, setHeaderActions, setHeaderTitle]);
  const handleSearch = (query: Object) => {
    fetchDifficultys(query);
  };
  return (
    <div>
      <MyTable
        keySearch="level"
        data={difficultys}
        schemas={difficultySchemas}
        actions={actionTable}
        totalRecords={total}
        isLoading={isLoadingApi}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Difficulty;
