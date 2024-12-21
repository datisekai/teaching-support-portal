import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { locationSchemas } from "../../dataTable/locationTable";
import useConfirm from "../../hooks/useConfirm";
import { useToast } from "../../hooks/useToast";
import { useCommonStore } from "../../stores";
import { useLocationStore } from "../../stores/locationStore";

const Location = () => {
    const navigate = useNavigate();
    const { onConfirm } = useConfirm();
    const { setHeaderTitle, setHeaderActions, resetActions } = useCommonStore();
    const { locations, addLocation, fetchLocations, deleteLocation } =
        useLocationStore();
    const { isLoadingApi } = useCommonStore();
    const { showToast } = useToast();
    const handleEdit = (data: any) => {
        navigate(`/location/edit/${data.id}`);
    };

    const handleDelete = (id: number) => {
        const data = {
            message: "Bạn có chắc chắn muốn xoá vị trí này?",
            header: "Xác nhận xoá",
            onAccept: async () => {
                try {
                    const result = await deleteLocation(id);
                    if (!result) {
                        return showToast({
                            severity: "error",
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
            onReject: () => { },
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
            permission: "location:update",
        },
        {
            onClick: (data, options) => {
                handleDelete(data.id);
            },
            tooltip: "Xóa",
            icon: "pi-trash",
            severity: "danger",
            permission: "location:update",
        },
    ];

    useEffect(() => {
        setHeaderTitle("Quản lý vị trí");
        setHeaderActions([
            {
                title: "Tạo",
                icon: "pi pi-plus",
                onClick: () => {
                    navigate(`/location/create`);
                },
                type: "button",
                disabled: false,
                permission: "location:create",
            },
        ]);

        return () => {
            resetActions();
        };
    }, [navigate, resetActions, setHeaderActions, setHeaderTitle]);
    const handleSearch = (query: Object) => {
        fetchLocations(query);
    };
    return (
        <div>
            <MyTable
                data={locations}
                schemas={locationSchemas}
                actions={actionTable}
                isLoading={isLoadingApi}
                onChange={handleSearch}
            />
        </div>
    );
};

export default Location;
