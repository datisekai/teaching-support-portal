import { IForm, IFormItem } from "../types/form-item";

export const TestForm: IForm[] = [
  {
    title: "Input",
    attributes: [
      {
        prop: "name",
        type: "text",
        label: "Input Text",
        col: 12,
      },
      {
        prop: "description",
        type: "number",
        label: "Input Number",
        col: 12,
      },
      {
        prop: "description",
        type: "textarea",
        label: "Textarea",
        col: 12,
      },
      {
        prop: "description",
        type: "switch",
        label: "Switch",
        col: 12,
      },
    ],
  },
  {
    title: "Select",
    attributes: [
      {
        prop: "name",
        type: "select",
        label: "Select",
        col: 12,
        options: [
          {
            title: "Option 1",
            value: "1",
          },
          {
            title: "Option 2",
            value: "2",
          },
        ],
      },
      {
        prop: "name",
        type: "select-ajax",
        label: "Select",
        col: 12,
        options: [
          {
            title: "Option 1",
            value: "1",
          },
          {
            title: "Option 2",
            value: "2",
          },
        ],
      },
    ],
  },
  {
    title: "File",
    attributes: [
      {
        prop: "name",
        type: "file",
        label: "Choose File",
        col: 12,
      },
    ],
  },
  {
    title: "Editor",
    attributes: [
      {
        prop: "name",
        type: "editor",
        label: "Editor",
        col: 12,
      },
    ],
  },
];
