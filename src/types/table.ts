export interface TableSchema {
  prop: string;
  label: string;
  type: "text" | "number" | "date" | "badge" | "money" | "datetime";
  getBadge?: (value: any) => {
    value: string;
    severity: "danger" | "success" | "info" | "warning" | null;
  };
}
