import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect } from 'react'
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { DepartmentForm } from '../components/dataForm/department'
import GroupItem from '../components/Form/GroupItem'
import { useCommonStore } from '../stores'
import { IAction } from '../stores/commonStore'

const schema = yup
    .object()
    .shape({
        name: yup.string().required(),
        description: yup.string().required(),
    })
    .required()
const Department = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })

    const setFooterActions = useCommonStore(state => state.setFooterActions)
    const setHeaderTitle = useCommonStore(state => state.setHeaderTitle)
    const resetActions = useCommonStore(state => state.resetActions)


    const onSubmit = (data: any) => {
        console.log('data', data);
    }

    useEffect(() => {
        const actions: IAction[] = [
            {
                title: "Trở lại",
                severity: 'secondary',
                action: 'back'
            },
            {
                onClick: handleSubmit(onSubmit),
                title: "Tạo ngành học",
                icon: 'pi-plus'
            },

        ]
        setFooterActions(actions)
        setHeaderTitle('Tạo ngành học')

        return () => {
            resetActions()
        }
    }, [])

    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
                {DepartmentForm.map((form, index) => (
                    <GroupItem errors={errors} {...form} key={index} register={register} />
                ))}
            </form>
        </div>
    )
}

export default Department