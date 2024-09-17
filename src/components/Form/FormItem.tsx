import React, { useMemo } from 'react'
import { IFormItem } from '../../types/form-item'
import { InputText } from 'primereact/inputtext'
import { UseFormRegister } from 'react-hook-form'
import { Editor } from 'primereact/editor';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { FileUpload } from 'primereact/fileupload';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputSwitch } from 'primereact/inputswitch';

interface IForm extends IFormItem {
    register: UseFormRegister<any>;
    error?: string
}

const FormItem: React.FC<IForm> = ({ prop, label, type, options, error, register, col = 6 }) => {

    const width = useMemo(() => {
        return (col / 12) * 100 + '%'
    }, [col])

    const renderFormItem = () => {
        const { onChange, ...rest } = register(prop)
        switch (type) {
            case "text":
                return <InputText {...rest} onChange={onChange} className='tw-w-full' invalid={!!error} placeholder={label} aria-describedby={`${prop}-help`} />

            case 'editor':
                return <Editor placeholder={label} {...rest} onTextChange={(e) => {
                    onChange({ target: { value: e.htmlValue, name: prop }, })
                }} style={{ height: '320px' }
                } />
            case 'number':
                return <InputNumber className='tw-w-full' {...rest as any} useGrouping={false} />
            case 'select':
            case 'select-ajax':
                return <Dropdown {...register(prop)} options={options || []} optionLabel="title" optionValue="value"
                    placeholder={`Select a ${label}`} className="tw-w-full" />
            case 'date':
                return <Calendar {...register(prop)} />
            case 'file':
                return <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" maxFileSize={1000000} />
            case 'textarea':
                return <InputTextarea {...register(prop)} rows={5} cols={30} />
            case 'switch':
                return <InputSwitch {...register(prop) as any} />
            default:
                return <InputText {...rest} onChange={onChange} className='tw-w-full' invalid={!!error} placeholder={label} aria-describedby={`${prop}-help`} />
        }
    }

    const formItem = renderFormItem();
    return (
        <>
            <div style={{ width }}>
                <div>
                    <label className='tw-mb-2 tw-block' htmlFor={prop}>{label}</label>
                    {formItem}
                    <small id={`${prop}-help`} className='tw-text-red-500'>
                        {error && error}
                    </small>
                </div>
            </div>
        </>
    )
}

export default React.memo(FormItem)