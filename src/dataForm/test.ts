import { IForm, IFormItem } from "../types/form-item";

export const TestForm: IForm[] = [
  {
    title: "Input",
    attributes: [
      {
        prop: "name",
        type: "text",
        label: "Input Text",
        col: 6,
      },
      {
        prop: "description",
        type: "number",
        label: "Input Number",
        col: 6,
      },
      {
        prop: "a",
        type: "textarea",
        label: "Textarea",
        col: 6,
      },
      {
        prop: "b",
        type: "switch",
        label: "Switch",
        col: 6,
      },
    ],
  },
  {
    title: "Select",
    attributes: [
      {
        prop: "select_a",
        type: "select",
        label: "Select",
        col: 6,
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
        prop: "select_b",
        type: "select-ajax",
        label: "Select",
        col: 6,
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
        prop: "select_c",
        type: "file",
        label: "Choose File",
        col: 6,
      },
    ],
  },
  {
    title: "Editor",
    attributes: [
      {
        prop: "select_d",
        type: "editor",
        label: "Editor",
        col: 6,
      },
    ],
  },
];
