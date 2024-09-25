import React, { useEffect, useMemo, useState } from "react";
import { IFormItem } from "../../types/form-item";
import { InputText } from "primereact/inputtext";
import { Controller } from "react-hook-form";
import { Editor } from "primereact/editor";
import { InputNumber } from "primereact/inputnumber";
import { InputSwitch } from "primereact/inputswitch";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from "primereact/multiselect";

interface IForm extends IFormItem {
  control: any;
  error?: string;
}

const FormItem: React.FC<IForm> = ({
  prop,
  label,
  type,
  options,
  error,
  control,
  col = 6,
  apiUrl,
}) => {
  const width = useMemo(() => `${(col / 12) * 100}%`, [col]);
  const [ajaxOptions, setAjaxOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const renderController = (renderFn: (props: any) => JSX.Element) => (
    <Controller control={control} name={prop} render={renderFn} />
  );

  const getOptions = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
    //TODO: Call API
  };

  useEffect(() => {
    if (type == "select-ajax" && apiUrl) {
      getOptions();
    }
  }, []);

  const getInputComponent = () => {
    switch (type) {
      case "text":
        return renderController(
          ({ field: { onChange, onBlur, value, ref } }) => (
            <InputText
              name={prop}
              value={value}
              onBlur={onBlur}
              ref={ref}
              onChange={onChange}
              className="tw-w-full"
              placeholder={label}
              aria-describedby={`${prop}-help`}
              invalid={!!error}
            />
          )
        );
      case "editor":
        return renderController(({ field: { onChange, value, onBlur } }) => (
          <Editor
            placeholder={label}
            value={value}
            name={prop}
            onSelectionChange={(e) => {
              console.log("e", e);
            }}
            onTextChange={(e) =>
              onChange({ target: { value: e.htmlValue, name: prop } })
            }
            style={{ height: "320px" }}
            onBlur={onBlur}
          />
        ));
      case "number":
        return renderController(({ field: { onChange, value, onBlur } }) => (
          <InputNumber
            value={value}
            onValueChange={(e) =>
              onChange({ target: { value: e.value, name: prop } })
            }
            className="tw-w-full"
            useGrouping={false}
            onBlur={onBlur}
            placeholder={label}
            invalid={!!error}
          />
        ));
      case "switch":
        return renderController(({ field: { onChange, onBlur, value } }) => (
          <InputSwitch
            invalid={!!error}
            checked={value}
            onChange={(e) =>
              onChange({ target: { value: e.value, name: prop } })
            }
            onBlur={onBlur}
          />
        ));
      case "date":
        return renderController(({ field: { onChange, onBlur, value } }) => (
          <Calendar
            className="tw-w-full"
            placeholder={label}
            invalid={!!error}
            value={value}
            onBlur={onBlur}
            onChange={(e) =>
              onChange({ target: { value: e.value, name: prop } })
            }
          />
        ));
      case "select":
        return renderController(({ field: { onChange, onBlur, value } }) => (
          <Dropdown
            invalid={!!error}
            onBlur={onBlur}
            value={value}
            onChange={(e) =>
              onChange({ target: { value: e.value, name: prop } })
            }
            options={options}
            optionLabel="title"
            placeholder={`Chọn ${label.toLowerCase()}`}
            className="tw-w-full"
          />
        ));
      case "multi-select":
        return renderController(({ field: { onChange, onBlur, value } }) => (
          <MultiSelect
            invalid={!!error}
            onBlur={onBlur}
            value={value}
            onChange={(e) =>
              onChange({ target: { value: e.value, name: prop } })
            }
            filter
            options={options}
            optionLabel="title"
            placeholder={`Chọn ${label.toLowerCase()}`}
            className="tw-w-full"
          />
        ));
      case "select-ajax":
        return renderController(({ field: { onChange, onBlur, value } }) => (
          <Dropdown
            loading={loading}
            invalid={!!error}
            onBlur={onBlur}
            value={value}
            onChange={(e) =>
              onChange({ target: { value: e.value, name: prop } })
            }
            options={ajaxOptions}
            placeholder={`Chọn ${label.toLowerCase()}`}
            className="tw-w-full"
          />
        ));
      case "textarea":
        return renderController(({ field: { onChange, onBlur, value } }) => (
          <InputTextarea
            invalid={!!error}
            onBlur={onBlur}
            value={value}
            onChange={onChange}
            className="tw-w-full"
            rows={5}
            cols={30}
            placeholder={label}
          />
        ));
      default:
        return renderController(
          ({ field: { onChange, onBlur, value, ref } }) => (
            <InputText
              name={prop}
              value={value}
              onBlur={onBlur}
              ref={ref}
              onChange={onChange}
              className="tw-w-full"
              placeholder={label}
              aria-describedby={`${prop}-help`}
              invalid={!!error}
            />
          )
        );
    }
  };

  return (
    <div style={{ width }}>
      <div>
        <label className="tw-mb-2 tw-block" htmlFor={prop}>
          {label}
        </label>
        {getInputComponent()}
        {error && (
          <small id={`${prop}-help`} className="tw-text-red-500">
            {error}
          </small>
        )}
      </div>
    </div>
  );
};

export default React.memo(FormItem);
