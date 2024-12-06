import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import React, {
  FC,
  useState,
  useCallback,
  useEffect,
  useRef,
  memo,
  useMemo,
} from "react";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { useDebounceValue } from "usehooks-ts";
import { Tag } from "primereact/tag";
import { Menu } from "primereact/menu";
import dayjs from "dayjs";
import { TableSchema } from "../../types/table";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { InputNumber } from "primereact/inputnumber";
import { IActionTable } from "./MyTable";
import useConfirm from "../../hooks/useConfirm";
import MyCard from "./MyCard";
import { useUserStore } from "../../stores/userStore";

interface IMyTable {
  schemas: TableSchema[];
  isLoading?: boolean;
  data: any[];
  keySearch?: string;
  totalRecords?: number;
  perPage?: number;
  onChange?: (query: object) => void;
  actions?: IActionTable[];
  isFooter?: boolean;
  headerTable?: React.ReactNode;
  footer?: React.ReactNode;
  setData?: any;
}

const MyTableCustom: FC<IMyTable> = ({
  data = [],
  schemas = [],
  keySearch = "",
  totalRecords = 0,
  perPage = 5,
  onChange,
  actions = [],
  isLoading = false,
  isFooter = false,
  headerTable,
  footer,
  setData,
}) => {
  const [first, setFirst] = useState(0);
  const menuRight = useRef<Menu>(null);
  const [debouncedValue, setValue] = useDebounceValue("", 500);
  const [selectedRowData, setSelectedRowData] = useState<any>(null);
  const { permissions } = useUserStore();

  const actionsFiltered = useMemo(() => {
    return actions.filter((action) => {
      if (!action.permission) return true;
      return permissions?.includes(action.permission);
    });
  }, [actions, permissions]);

  useEffect(() => {
    if (onChange && typeof onChange === "function") {
      onChange({ [keySearch]: debouncedValue, page: first });
    }
  }, [debouncedValue, first]);

  const handlePageChange = (event: PaginatorPageChangeEvent) => {
    const page = event.first;
    setFirst(page);
  };
  const handleMenuClick = (event: any, rowData: any) => {
    setSelectedRowData(rowData);
    menuRight?.current?.toggle(event);
  };

  const handleInputChange = (rowIndex: number, field: string, value: any) => {
    const newData = [...data];
    newData[rowIndex] = { ...newData[rowIndex], [field]: value };
    setData(newData);
  };

  const bodyTemplate = (row: any, options: any) => {
    const key = options.field;
    const schema = schemas.find((item) => item.prop === key);
    const value = row[key] || "";
    const rowIndex = data.indexOf(row);
    const editable = schema?.editable ?? false;
    const disabled = schema?.disabled ?? false;
    switch (schema?.type) {
      case "text":
        return editable ? (
          <InputText
            disabled={disabled}
            value={value}
            onChange={(e) => handleInputChange(rowIndex, key, e.target.value)}
          />
        ) : (
          <span>{value}</span>
        );
      case "number":
        return editable ? (
          <InputNumber
            minFractionDigits={2}
            maxFractionDigits={5}
            disabled={disabled}
            min={1}
            max={100}
            prefix={schema?.prefix}
            value={value}
            onChange={(e) => handleInputChange(rowIndex, key, e.value)}
          />
        ) : (
          <span>{value}</span>
        );
      case "date":
        return <span>{dayjs(value).format("DD/MM/YYYY")}</span>;
      case "datetime":
        return <span>{dayjs(value).format("DD/MM/YYYY HH:mm")}</span>;
      case "badge":
        if (schema?.getBadge && typeof schema.getBadge == "function") {
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
        <InputText
          onChange={(event) => setValue(event.target.value)}
          placeholder="Keyword Search"
        />
      </div>
    );
  }, [keySearch]);

  const renderActions = useCallback(
    (rowData: any, options: any) => {
      const items = [
        {
          label: "Hành động",
          items: actionsFiltered.map((action) => ({
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
          {actionsFiltered && actionsFiltered.length > 0 && (
            <div
              className={
                actionsFiltered.length < 4 ? "tw-flex md:tw-hidden" : "tw-flex"
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
          {actionsFiltered?.map((action, index) => (
            <Button
              size="small"
              className={
                actionsFiltered.length < 4
                  ? "md:tw-flex tw-hidden"
                  : "tw-hidden"
              }
              tooltip={action.tooltip}
              tooltipOptions={{ position: "top" }}
              loading={action.loading}
              disabled={action.disabled}
              key={index}
              severity={action.severity}
              onClick={() => {
                if (action.onClick) {
                  action.onClick(data, options);
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
    [actionsFiltered, selectedRowData]
  );

  const header = useMemo(() => {
    return keySearch ? renderHeader() : undefined;
  }, [keySearch]);
  const displayPaginator = useMemo(() => {
    return totalRecords > perPage;
  }, [totalRecords, perPage]);

  return (
    <div className="card">
      <div>{headerTable}</div>
      <DataTable
        loading={isLoading}
        value={data}
        header={header}
        footer={isFooter && footer}
        tableStyle={{ minWidth: "10rem" }}
      >
        {schemas.map((schema) => {
          return (
            <Column
              body={bodyTemplate}
              key={schema.prop}
              field={schema.prop}
              header={schema.label}
              style={{ minWidth: schema.minWidth || "50px" }}
            ></Column>
          );
        })}
        {actionsFiltered && actionsFiltered.length > 0 && (
          <Column
            body={renderActions}
            field="actions"
            header="Thao tác"
          ></Column>
        )}
      </DataTable>
      {displayPaginator && (
        <Paginator
          first={first}
          rows={perPage}
          totalRecords={totalRecords}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default memo(MyTableCustom);
