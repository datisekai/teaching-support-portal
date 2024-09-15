import React from 'react'
import { IForm } from '../../types/form-item'
import MyCard from '../UI/MyCard'
import FormItem from './FormItem'
import { UseFormRegister } from 'react-hook-form';

interface IGroup extends IForm {
    register: UseFormRegister<any>;
    errors: any
}
const GroupItem: React.FC<IGroup> = ({ attributes, title, register, errors }) => {
    return (
        <MyCard title={title} className=' tw-flex tw-gap-x-4 tw-gap-y-4 tw-flex-wrap'>
            {attributes.map((attribute) => (
                <FormItem error={errors[attribute.prop]?.message || ''} key={attribute.prop} {...attribute} register={register} />
            ))}
        </MyCard>
    )
}

export default GroupItem