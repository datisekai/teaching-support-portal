import { Button } from 'primereact/button'
import React from 'react'

type Props = {
    onChange: (type: 'attendance' | 'exam') => void,
}
const Step1: React.FC<Props> = ({ onChange }) => {
    return (
        <div>
            <div className='tw-flex tw-gap-4'>
                <Button label="Điểm điểm danh" onClick={() => onChange('attendance')}></Button>
                <Button label="Điểm bài thi" onClick={() => onChange('exam')}></Button>
            </div>
        </div>
    )
}

export default Step1