export interface TableSchema {
  prop: string;
  label: string;
  type: "text" | "number" | "date" | "badge" | "datetime";
  editable?: boolean; // Thêm thuộc tính editable để phân biệt cột có thể chỉnh sửa
  getBadge?: (value: any) => {
    value: string;
    severity: "danger" | "success" | "info" | "warning" | null;
  };
  minWidth?: string;
  children?: TableSchema[];
  prefix?: "%" | "currency" | "time" | "";
}
