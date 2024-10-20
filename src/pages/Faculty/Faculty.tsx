import { useEffect, useState } from "react";
import { useCommonStore } from "../../stores";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { facultySchemas } from "../../dataTable/facultyTable";
import { useNavigate } from "react-router-dom";
import useConfirm from "../../hooks/useConfirm";
import { uploadFile } from "../../utils";
import { useFacultyStore } from "../../stores/facultyStore";
import { useToast } from "../../hooks/useToast";
import { pathNames } from "../../constants";

const Faculty = () => {
  const actionTable: IActionTable[] = [
    {
      onClick: (data) => handleEdit(data),
      tooltip: "Sửa",
      icon: "pi-pencil",
      severity: "warning",
    },
    {
      onClick: (data) => handleDelete(data.id),
      tooltip: "Xóa",
      icon: "pi-trash",
      severity: "danger",
    },
  ];
  const navigate = useNavigate();
  const { onConfirm } = useConfirm();
  const { showToast } = useToast();
  const { setHeaderTitle, setHeaderActions, resetActions, isLoadingApi } =
    useCommonStore();
  const { facultys, total, deleteFaculty, fetchFacultys } = useFacultyStore();

  const handleEdit = (data: any) => {
    navigate(`${pathNames.FACULTY}/edit/${data.id}`);
  };

  const handleDelete = (id: string) => {
    const data = {
      message: "Bạn có chắc chắn muốn xoá ngành học này?",
      header: "Xác nhận xoá",
      onAccept: async () => {
        const result = await deleteFaculty(parseInt(id));
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
      onReject: () => {},
    };
    onConfirm(data);
  };

  useEffect(() => {
    setHeaderTitle("Quản lý ngành học");
    setHeaderActions([
      {
        title: "Tạo",
        icon: "pi pi-plus",
        onClick: () => navigate(`${pathNames.FACULTY}/create`),
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
          console.log("Export logic");
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
    fetchFacultys(query);
  };

  return (
    <div>
      <MyTable
        keySearch="name"
        data={facultys}
        schemas={facultySchemas}
        actions={actionTable}
        totalRecords={total}
        isLoading={isLoadingApi}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Faculty;
