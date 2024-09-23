
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { TableSchema } from '../../types/table';
import { FC, useMemo, memo, useState, useCallback, useEffect } from 'react';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { useDebounceValue } from 'usehooks-ts'
import dayjs from 'dayjs';
import { Tag } from 'primereact/tag';

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
    tooltip?: string
}


interface IMyTable {
    schemas: TableSchema[],
    data: any[],
    keySearch?: string,
    totalRecords?: number,
    perPage?: number
    onChange?: (query: object) => void
    actions?: IActionTable[]
}

const MyTable: FC<IMyTable> = ({ data = [], schemas = [], keySearch = "", totalRecords = 0, perPage = 5, onChange, actions }) => {
    const [first, setFirst] = useState(0);

    const [debouncedValue, setValue] = useDebounceValue("", 500)

    const handlePageChange = (event: PaginatorPageChangeEvent) => {
        const page = event.first
        setFirst(page);

    };

    useEffect(() => {
        if (onChange && typeof onChange == 'function') {
            onChange({ [keySearch]: debouncedValue, page: first })
        }
    }, [debouncedValue, first])

    const bodyTemplate = (row: any, options: any) => {
        const key = options.field;

        const schema = schemas.find(item => item.prop === key);
        const value = row[key] || ''
        switch (schema?.type) {
            case 'text':
            case 'number':
                return <span>{value}</span>
            case 'date':
                return <span>{dayjs(value).format('DD/MM/YYYY')}</span>
            case 'datetime':
                return <span>{dayjs(value).format('DD/MM/YYYY HH:mm')}</span>
            case 'badge':
                if (schema?.getBadge && typeof schema.getBadge == 'function') {
                    const { severity, value: renderValue } = schema.getBadge(value)
                    return <Tag value={renderValue} severity={severity} />
                }
                return <span>{value}</span>
            default:
                return <span>{value}</span>

        }

    }

    const renderHeader = useCallback(() => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined />
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText onChange={event => setValue(event.target.value)} placeholder="Keyword Search" />
                </IconField>
            </div>
        );
    }, [keySearch])

    const renderActions = useCallback((data: any, options: any) => {
        return <div className='tw-w-full tw-flex tw-gap-2 tw-flex-wrap tw-items-center'>
            {actions?.map((action, index) => (<Button tooltip={action.tooltip}
                tooltipOptions={{ position: "top" }} loading={action.loading} disabled={action.disabled} key={index} severity={action.severity} onClick={() => {
                    if (action.onClick) {
                        action.onClick(data, options)
                    }
                }} label={action.title} iconPos={action.iconPos || 'left'} icon={action.icon} />))}
        </div>
    }, [actions])

    const header = useMemo(() => {
        return keySearch ? renderHeader() : undefined
    }, [keySearch])

    const displayPaginator = useMemo(() => {
        return totalRecords > perPage
    }, [totalRecords, perPage])

    return (
        <div className="card">

            <DataTable value={data} header={header} tableStyle={{ minWidth: '10rem' }}>
                {
                    schemas.map((schema) => {
                        return <Column body={bodyTemplate} key={schema.prop} field={schema.prop} header={schema.label}></Column>
                    })
                }
                {actions && actions.length > 0 && <Column body={renderActions} field="actions" header="Thao tác"></Column>}
            </DataTable>
            {displayPaginator && <Paginator
                first={first}
                rows={perPage}
                totalRecords={totalRecords}
                onPageChange={handlePageChange}
            />}
        </div>
    );
}

export default memo(MyTable);
