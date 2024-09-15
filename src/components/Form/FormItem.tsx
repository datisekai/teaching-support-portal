import React, { useMemo } from 'react'
import { IFormItem } from '../../types/form-item'
import { InputText } from 'primereact/inputtext'
import { UseFormRegister } from 'react-hook-form'

interface IForm extends IFormItem {
    register: any;
    error?: string
}

const FormItem: React.FC<IForm> = ({ prop, label, type, options, error, register, col = 6 }) => {

    const width = useMemo(() => {
        return (col / 12) * 100 + '%'
    }, [col])

    const renderFormItem = () => {
        switch (type) {
            case "text":
                return <div style={{ width }}>
                    <div>
                        <label htmlFor={prop}>{label}</label>
                        <InputText className='w-full mt-2' invalid={!!error} placeholder={label} {...register(prop)} id={prop} aria-describedby={`${prop}-help`} />
                        <small id={`${prop}-help`} className='tw-text-red-500'>
                            {error && error}
                        </small>
                    </div>
                </div>
        }
    }

    const formItem = renderFormItem();
    return (
        <>
            {formItem}
        </>
    )
}

export default React.memo(FormItem)