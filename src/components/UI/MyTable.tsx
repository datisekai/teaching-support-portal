import dayjs from "dayjs";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Menu } from "primereact/menu";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { Tag } from "primereact/tag";
import { FC, memo, useCallback, useEffect, useRef, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { TableSchema } from "../../types/table";

export interface IActionTable {
  title?: string;
  icon?: string;
  onClick?: (data: any, options: any) => void;
  type?: "button" | "file";
  disabled?: boolean;
  iconPos?: "right" | "left";
  severity?: "success" | "info" | "warning" | "danger" | "help" | "secondary";
  loading?: boolean;
  action?: "back";
  tooltip?: string;
  isHidden?: (data: any) => boolean
}
export interface QueryParams {
  page?: number;
  [key: string]: any;
}
interface IMyTable {
  schemas: TableSchema[];
  data: any[];
  keySearch?: string;
  keySearchLabel?: string;
  totalRecords?: number;
  perPage?: number;
  onChange?: (query: object) => void;
  actions?: IActionTable[];
  isLoading?: boolean;
}

const MyTable: FC<IMyTable> = ({
  data = [],
  schemas = [],
  keySearch = "",
  totalRecords = 0,
  perPage = 10,
  onChange,
  actions = [],
  isLoading = false,
  keySearchLabel
}) => {
  const [first, setFirst] = useState(1);
  const [selectedRowData, setSelectedRowData] = useState<any>(null);
  const menuRight = useRef<Menu>(null);
  const [debouncedValue, setValue] = useDebounceValue("", 500);

  const handlePageChange = (event: PaginatorPageChangeEvent) => {
    const page = Math.max(1, event.page + 1);
    setFirst(page);
  };

  useEffect(() => {
    if (onChange && typeof onChange == "function") {
      onChange({ [keySearch]: debouncedValue, page: first });
    }
  }, [debouncedValue, first]);

  const handleMenuClick = (event: any, rowData: any) => {
    setSelectedRowData(rowData);
    menuRight?.current?.toggle(event);
  };

  const bodyTemplate = (row: any, options: any) => {
    const key = options.field;

    const schema = schemas.find((item) => item.prop === key);
    const value = row[key] || "";
    const isHtml = /<\/?[a-z][\s\S]*>/i.test(value);

    if (schema?.render && typeof schema.render === "function") {
      return schema.render(row);
    }


    switch (schema?.type) {
      case "text":
      case "number":
        return isHtml ? (
          <div dangerouslySetInnerHTML={{ __html: value }} />
        ) : (
          <span>{value || "Chưa có"}</span>
        );
      case "date":
        return <span>{dayjs(value).format("DD/MM/YYYY")}</span>;
      case "datetime":
        return <span>{dayjs(value).format("DD/MM/YYYY HH:mm")}</span>;
      case "badge":
        if (schema?.getBadge && typeof schema.getBadge === "function") {
          const { severity, value: renderValue } = schema.getBadge(value);
          return <Tag value={renderValue} severity={severity} />;
        }
        return <span>{value}</span>;
      default:
        return <span>{value}</span>;
    }
  };

  const renderHeader = useCallback(() => {
    return (
      <div className="flex justify-content-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          outlined
        />
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            onChange={(event) => setValue(event.target.value)}
            placeholder={`Search by ${keySearchLabel || keySearch}`}
          />
        </IconField>
      </div>
    );
  }, [keySearch]);

  const renderActions = useCallback(
    (rowData: any, options: any) => {

      const actionActives = actions.filter((action) => !action?.isHidden?.(rowData));

      const items = [
        {
          label: "Hành động",
          items: actionActives.map((action) => ({
            label: action.tooltip,
            icon: `pi ${action.icon}`,
            command: () => {
              if (action.onClick) {
                action.onClick(selectedRowData, options);
              }
            },
          })),
        },
      ];

      return (
        <div className="tw-w-full tw-flex tw-gap-2 tw-flex-wrap tw-items-center">
          {actionActives && actionActives.length > 0 && (
            <div
              className={
                actionActives.length < 4 ? "tw-flex md:tw-hidden" : "tw-flex"
              }
            >
              <Menu
                model={items}
                popup
                ref={menuRight}
                id="popup_menu_right"
                popupAlignment="right"
                aria-hidden="false"
              />
              <Button
                size="small"
                icon="pi pi-angle-down"
                className="mr-2"
                onClick={(event) => handleMenuClick(event, rowData)}
                aria-controls="popup_menu_right"
                aria-haspopup
              />
            </div>
          )}
          {actionActives?.map((action, index) => (
            <Button
              size="small"
              className={
                actionActives.length < 4 ? "md:tw-flex tw-hidden" : "tw-hidden"
              }
              tooltip={action.tooltip}
              tooltipOptions={{ position: "top" }}
              loading={action.loading}
              disabled={action.disabled}
              key={index}
              severity={action.severity}
              onClick={() => {
                if (action.onClick) {
                  action.onClick(rowData, options);
                }
              }}
              label={action.title}
              iconPos={action.iconPos || "left"}
              icon={`pi ${action.icon}`}
            />
          ))}
        </div>
      );
    },
    [actions, selectedRowData]
  );

  return (
    <div className="card">
      <DataTable
        loading={isLoading}
        value={data}
        header={keySearch ? renderHeader() : null}
        tableStyle={{ minWidth: "10rem" }}
      >
        {schemas.map((schema) => (
          <Column
            body={bodyTemplate}
            key={schema.prop}
            field={schema.prop}
            header={schema.label}
            style={{ minWidth: schema.minWidth || "50px" }}
          />
        ))}
        {actions && actions.length > 0 && (
          <Column body={renderActions} field="actions" header="Thao tác" />
        )}
      </DataTable>
      {totalRecords > perPage && (
        <Paginator
          first={first * perPage - 1}
          rows={perPage}
          totalRecords={totalRecords}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default memo(MyTable);
