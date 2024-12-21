import { TableSchema } from "../types/table";

export const locationSchemas: TableSchema[] = [
    {
        label: "#",
        prop: "index",
        type: "number",
    },
    {
        label: "Tên vị trí",
        prop: "name",
        type: "text",
    },
    {
        label: "Độ chính xác",
        prop: "accuracy",
        type: "text",
        render(data) {
            return `${data.accuracy} m`;
        },
    },
    {
        label: "Vĩ độ",
        prop: "latitude",
        type: "text",
    },
    {
        label: "Kinh độ",
        prop: "longitude",
        type: "text",
    },
    {
        label: "Ngày tạo",
        prop: "createdAt",
        type: "datetime",
    },
    {
        label: "Ngày sửa",
        prop: "updatedAt",
        type: "datetime",
    },
    {
        label: "Người tạo",
        prop: "user",
        type: "text",
        render(data) {
            return `${data.user.name}`
        },
    }
];

