import React, { act, memo, useMemo } from 'react'
import { useCommonStore } from '../../stores'
import { Button } from 'primereact/button'
import { IAction } from '../../stores/commonStore'
import { useNavigate } from 'react-router-dom'


const MyHeaderAction = () => {

    const actions = useCommonStore(state => state.header.actions)
    const navigate = useNavigate()

    const getIcon = (action: IAction) => {
        if (!action.icon) return undefined
        switch (action.action) {
            case "back":
                return "pi pi-arrow-left"
        }

        return `pi ${action.icon}`
    }

    const handleClick = (action: IAction) => {
        switch (action.action) {
            case "back":
                return () => navigate(-1)
        }

        return action.onClick
    }

    return (

        <div className='tw-flex-1 tw-w-full tw-flex tw-gap-2 tw-justify-end tw-items-center'>
            {actions.map((action, index) => (<Button loading={action.loading} disabled={action.disabled} key={index} severity={action.severity} onClick={handleClick(action)} label={action.title} iconPos={action.iconPos || 'left'} icon={getIcon(action)} />))}
        </div>
    )
}

export default memo(MyHeaderAction)