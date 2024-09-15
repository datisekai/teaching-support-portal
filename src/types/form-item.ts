import { UseFormRegister } from "react-hook-form";

export interface IFormItem {
  label: string;
  type:
    | "text"
    | "number"
    | "select"
    | "select-ajax"
    | "date"
    | "checkbox"
    | "radio"
    | "textarea"
    | "file"
    | "editor"
    | "image";
  prop: string;
  options?: IOption[];
  col?: number;
}

export interface IForm {
  title: string;
  attributes: IFormItem[];
}

export interface IOption {
  title: string;
  value: any;
}
