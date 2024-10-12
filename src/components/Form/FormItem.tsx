import React, { useEffect, useMemo, useState } from "react";
import { IFormItem, IOption } from "../../types/form-item";
import { InputText } from "primereact/inputtext";
import { Controller } from "react-hook-form";
import { Editor } from "primereact/editor";
import { InputNumber } from "primereact/inputnumber";
import { InputSwitch } from "primereact/inputswitch";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from "primereact/multiselect";
import { useWindowSize } from "usehooks-ts";
import MyUploadSingleImage from "../UI/MyUploadSingleImage";
import MyEditor from "../UI/MyEditor";
import { sendServerRequest } from "../../apis";

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
  getOptions
}) => {
  const windowSize = useWindowSize();

  const width = useMemo(() => {
    if (windowSize.width < 768) return "100%";
    return `${(col / 12) * 100}%`;
  }, [col, windowSize.width]);
  const [ajaxOptions, setAjaxOptions] = useState<IOption[]>([]);
  const [loading, setLoading] = useState(false);

  const renderController = (renderFn: (props: any) => JSX.Element) => (
    <Controller control={control} name={prop} render={renderFn} />
  );

  const getAjaxOptions = async () => {
    setLoading(true);
    const data = await sendServerRequest({ endpoint: apiUrl, method: "GET", body: { limit: 10000 } });
    const newOptions = getOptions?.(data.data) || [];
    setAjaxOptions(newOptions)
    setLoading(false);
  };

  useEffect(() => {
    if (type == "select-ajax" && apiUrl && getOptions) {
      getAjaxOptions();
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
          // <Editor
          //   placeholder={label}
          //   value={value}
          //   name={prop}
          //   onSelectionChange={(e) => {
          //     console.log("e", e);
          //   }}
          //   onTextChange={(e) =>
          //     onChange({ target: { value: e.htmlValue, name: prop } })
          //   }
          //   style={{ height: "320px" }}
          //   onBlur={onBlur}
          // />
          <MyEditor value={value} height={500} onChange={(e) => onChange({ target: { value: e, name: prop } })} />
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
      case "date-time":
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
            showTime
            hourFormat="24"
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
            optionLabel="title"
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
      case "image":
        return renderController(({ field: { onChange, onBlur, value } }) => (
          // <MyUploadImage
          //   onChange={(url) => onChange({ target: { value: url, name: prop } })}
          //   value={value}
          // />
          <MyUploadSingleImage onChange={(e) => onChange({ target: { value: e, name: prop } })} value={value || ''} />
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
