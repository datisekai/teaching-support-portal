import React from 'react'
import { useModalStore } from '../../stores/modalStore'

const TestModal = () => {
    const { content } = useModalStore()
    return (
        <div>TestModal {JSON.stringify(content)}</div>
    )
}

export default TestModal