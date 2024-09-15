import React from 'react'
import { IForm } from '../../types/form-item'
import MyCard from '../UI/MyCard'
import { UseFormRegister } from 'react-hook-form'
import FormItem from './FormItem'

interface IGroup extends IForm {
    register: any;
    errors: any
}
const GroupItem: React.FC<IGroup> = ({ attributes, title, register, errors }) => {
    return (
        <MyCard title={title} className='tw-flex tw-gap-x-2 tw-gap-y-4'>
            {attributes.map((attribute, index) => (
                <FormItem error={errors[attribute.prop]?.message || ''} key={attribute.prop} {...attribute} register={register} />
            ))}
        </MyCard>
    )
}

export default GroupItem