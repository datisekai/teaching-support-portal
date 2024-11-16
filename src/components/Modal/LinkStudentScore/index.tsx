import React, { useEffect, useState } from 'react'
import { useModalStore } from '../../../stores'
import Step1 from './Step1';
import Step3 from './Step3';
import Step2 from './Step2';
import { Button } from 'primereact/button';

const LinkStudentScore = () => {
    const { content, header, setHeader } = useModalStore()
    const [step, setStep] = useState(1);
    const [type, setType] = useState('')
    const [refId, setRefId] = useState(0)

    const handleBack = () => {
        if (step == 1) return;
        setStep(step - 1)
    }

    useEffect(() => {
        setHeader(<div className='tw-flex tw-items-center tw-gap-2'>
            {step !== 1 && <Button onClick={handleBack} icon="pi pi-arrow-left" text size='small'></Button>}
            <span>Liên kết điểm {content.name}</span>
        </div>)
    }, [step])
    return (
        <div>
            {step == 1 && <Step1 onChange={(type) => {
                setType(type);
                setStep(2)
            }} />}
            {step == 2 && <Step2 type={type} onLink={(id) => {
                setRefId(id)
                setStep(3)
            }} />}
            {step == 3 && <Step3 type={type} refId={refId} />}
        </div>
    )
}

export default LinkStudentScore