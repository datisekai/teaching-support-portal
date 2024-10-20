import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from "primereact/multiselect";
import React, { useEffect, useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import { useWindowSize } from "usehooks-ts";
import { sendServerRequest } from "../../apis";
import { IFormItem, IOption } from "../../types/form-item";
import MyEditor from "../UI/MyEditor";
import MyUploadSingleImage from "../UI/MyUploadSingleImage";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { AutoComplete } from "primereact/autocomplete";

interface IForm extends IFormItem {
  control: any;
  error?: string;
  watch?: any;
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
  getOptions,
  description,
  watch,
  preConditionProp,
}) => {
  const windowSize = useWindowSize();

  const width = useMemo(() => {
    if (windowSize.width < 768) return "100%";
    return `${(col / 12) * 100}%`;
  }, [col, windowSize.width]);
  const [ajaxOptions, setAjaxOptions] = useState<IOption[] | null>(null);
  const [loading, setLoading] = useState(false);

  const renderController = (renderFn: (props: any) => JSX.Element) => (
    <Controller control={control} name={prop} render={renderFn} />
  );

  useEffect(() => {
    console.log("change", watch);
    if (preConditionProp && type === "select-ajax" && watch) {
      getAjaxOptions({ [preConditionProp]: watch });
    }
  }, [watch]);

  const getAjaxOptions = async (body = {}) => {
    setLoading(true);
    const data = await sendServerRequest({
      endpoint: apiUrl,
      method: "GET",
      body: { pagination: false, ...body },
    });
    const newOptions = getOptions?.(data.data) || [];
    setAjaxOptions(newOptions);
    setLoading(false);
  };

  useEffect(() => {
    if (
      (type == "select-ajax" || type == "multi-select-ajax") &&
      apiUrl &&
      getOptions
    ) {
      if (preConditionProp && !watch) return;
      if (preConditionProp && watch) {
        getAjaxOptions({ [preConditionProp]: watch });
        return;
      }
      getAjaxOptions();
    }
  }, []);
  const [filteredItems, setFilteredItems] = useState<IOption[]>([]);

  // Handle dynamic search via API
  const searchItems = async (event: any) => {
    const query = event.query.trim();
    if (!query) {
      setFilteredItems([]);
      return;
    }

    setLoading(true);
    try {
      // Make API request with the search query
      const response = await sendServerRequest({
        endpoint: `${apiUrl}?code=${query}`, // Assuming the API accepts query params for searching
        method: "GET",
      });

      // Process the API response
      const data = getOptions ? getOptions(response.data) : [];
      setFilteredItems(data);
    } catch (error) {
      console.error("Error fetching data", error);
      setFilteredItems([]);
    }
    setLoading(false);
  };

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
      case "search":
        return renderController(({ field: { onChange, onBlur, value } }) => (
          <div className="card p-fluid">
            <AutoComplete
              onBlur={onBlur}
              multiple
              value={value}
              suggestions={filteredItems}
              completeMethod={searchItems}
              field="title"
              onChange={(e) =>
                onChange({ target: { value: e.value, name: prop } })
              }
              placeholder={`Tìm kiếm ${label.toLowerCase()}`}
              className="!tw-w-full"
            />
          </div>
        ));
      case "editor":
        return renderController(({ field: { onChange, value, onBlur } }) => (
          <MyEditor
            value={value}
            height={500}
            onChange={(e) => onChange({ target: { value: e, name: prop } })}
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
            name={prop}
            onChange={(e) => {
              console.log("🚀 ~ getInputComponent ~ e:", e);

              onChange(e);
            }}
            filter
            options={options}
            optionLabel="title"
            placeholder={`Chọn ${label.toLowerCase()}`}
            className="tw-w-full"
          />
        ));
      case "select-ajax":
        return renderController(({ field: { onChange, onBlur, value } }) => {
          return (
            <Dropdown
              loading={loading}
              invalid={!!error}
              onBlur={onBlur}
              value={+value}
              disabled={Boolean(preConditionProp && !watch)}
              onChange={(e) => {
                onChange({ target: { value: e.value, name: prop } });
              }}
              options={ajaxOptions || []}
              placeholder={`Chọn ${label.toLowerCase()}`}
              className="tw-w-full"
              optionLabel="title"
            />
          );
        });
      case "multi-select-ajax":
        return renderController(({ field: { onChange, onBlur, value } }) => {
          return (
            <MultiSelect
              loading={loading}
              invalid={!!error}
              onBlur={onBlur}
              value={value}
              onChange={(e) =>
                onChange({ target: { value: e.value, name: prop } })
              }
              filter
              options={ajaxOptions || []}
              placeholder={`Chọn ${label.toLowerCase()}`}
              className="tw-w-full"
              optionLabel="title"
            />
          );
        });
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
          <MyUploadSingleImage
            onChange={(e) => onChange({ target: { value: e, name: prop } })}
            value={value || ""}
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
        <label className=" tw-block" htmlFor={prop}>
          {label}
        </label>
        {description && (
          <div className="tw-py-0 tw-text-sm tw-my-0 tw-text-gray-600">
            {description}
          </div>
        )}
        <div className="mt-2">{getInputComponent()}</div>
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
