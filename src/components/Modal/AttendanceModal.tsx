import React from 'react'
import { useModalStore } from '../../stores/modalStore'

const AttendanceModal = () => {
    const { content } = useModalStore()
    return (
        <div>AttendanceModal {JSON.stringify(content)}</div>
    )
}

export default AttendanceModal