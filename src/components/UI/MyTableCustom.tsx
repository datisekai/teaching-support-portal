import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import {
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

interface IMyTable {
  schemas: TableSchema[];
  data: any[];
  keySearch?: string;
  totalRecords?: number;
  perPage?: number;
  onChange?: (query: object) => void;
  actions?: IActionTable[];
  isFooter?: boolean;
}

const MyTableCustom: FC<IMyTable> = ({
  data = [],
  schemas = [],
  keySearch = "",
  totalRecords = 0,
  perPage = 5,
  onChange,
  actions = [],
  isFooter = false,
}) => {
  const [first, setFirst] = useState(0);
  const [tableData, setTableData] = useState(data);
  const menuRight = useRef<Menu>(null);
  const [debouncedValue, setValue] = useDebounceValue("", 500);

  useEffect(() => {
    if (onChange && typeof onChange === "function") {
      onChange({ [keySearch]: debouncedValue, page: first });
    }
  }, [debouncedValue, first]);

  useEffect(() => {
    setTableData(
      data.length > 0
        ? data
        : [
            {
              index: 1,
              name: "",
              percent: 100,
            },
          ]
    );
  }, [data]);

  const handlePageChange = (event: PaginatorPageChangeEvent) => {
    const page = event.first;
    setFirst(page);
  };

  const handleInputChange = (rowIndex: number, field: string, value: any) => {
    const newData = [...tableData];
    newData[rowIndex] = { ...newData[rowIndex], [field]: value };
    setTableData(newData);
  };

  const bodyTemplate = (row: any, options: any) => {
    const key = options.field;
    const schema = schemas.find((item) => item.prop === key);
    const value = row[key] || "";
    const rowIndex = tableData.indexOf(row);

    const editable = schema?.editable ?? false;
    switch (schema?.type) {
      case "text":
        return editable ? (
          <InputText
            value={value}
            onChange={(e) => handleInputChange(rowIndex, key, e.target.value)}
          />
        ) : (
          <span>{value}</span>
        );
      case "number":
        return editable ? (
          <InputNumber
            min={1}
            max={100}
            prefix="%"
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
        console.log("getbage", schema);
        if (schema?.getBadge && typeof schema.getBadge == "function") {
          console.log("join");
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
    (data: any, options: any) => {
      const items = useMemo(() => {
        let dropdown = [
          {
            label: "Hành động",
            items: actions.map((action) => ({
              label: action.tooltip,
              icon: `pi ${action.icon}`,
              command: () => {
                if (action.onClick) {
                  action.onClick(data, options);
                }
              },
            })),
          },
        ];
        return dropdown;
      }, [actions]);
      return (
        <div className="tw-w-full tw-flex tw-gap-2 tw-flex-wrap tw-items-center">
          {actions && actions.length > 0 && (
            <div
              className={
                actions.length < 4 ? "tw-flex md:tw-hidden" : "tw-flex"
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
                onClick={(event) => menuRight?.current?.toggle(event)}
                aria-controls="popup_menu_right"
                aria-haspopup
              />
            </div>
          )}
          {actions?.map((action, index) => (
            <Button
              size="small"
              className={
                actions.length < 4 ? "md:tw-flex tw-hidden" : "tw-hidden"
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
    [actions]
  );

  const header = useMemo(() => {
    return keySearch ? renderHeader() : undefined;
  }, [keySearch]);
  const displayPaginator = useMemo(() => {
    return totalRecords > perPage;
  }, [totalRecords, perPage]);
  const handleAdd = () => {
    setTableData([
      ...tableData,
      {
        index: tableData.length + 1,
        name: "",
        percent: 0,
      },
    ]);
  };
  const footer = (
    <Button text className="tw-w-full" label="Thêm Cột" onClick={handleAdd} />
  );

  return (
    <div className="card">
      <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
        <div className="tw-text-start">
          <div>Môn: Lập trình web</div>
          <div>Nhóm: 02</div>
        </div>
        <div className="tw-text-end">
          <div>Năm học: 2023 -2024</div>
          <div>Giảng viên: Nguyễn Thanh Sang</div>
        </div>
      </div>
      <DataTable
        value={tableData}
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
        {actions && actions.length > 0 && (
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
