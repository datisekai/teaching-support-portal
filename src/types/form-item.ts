export interface IFormItem {
  label: string;
  type:
    | "text"
    | "number"
    | "select"
    | "multi-select"
    | "select-ajax"
    | "date"
    | "date-time"
    | "switch"
    | "textarea"
    | "file"
    | "editor"
    | "image";
  prop: string;
  options?: IOption[];
  col?: number;
  apiUrl?: string;
  getOptions?: (data?: Array<any>) => IOption[];
  description?: string;
  preConditionProp?: string;
}

export interface IForm {
  title: string;
  attributes: IFormItem[];
}

export interface IOption {
  title: string;
  value: any;
}
