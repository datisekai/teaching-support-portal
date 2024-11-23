import React, { useEffect, useMemo, useState } from 'react'
import { QuestionType } from '../../../constants'
import { SelectButton } from 'primereact/selectbutton';
import useConfirm from '../../../hooks/useConfirm';
import { useExamStore } from '../../../stores/examStore';
import { useToast } from '../../../hooks/useToast';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { useCommonStore } from '../../../stores';

const choiceOptions = [
    {
        label: "Đúng",
        value: true,
    },
    {
        label: "Sai",
        value: false
    }
]
const ResultMultipleChoice = (props: any) => {
    const { data } = props;
    const [choice, setChoice] = useState<any>(null)
    const { onConfirm } = useConfirm()
    const { updateSubmission, updatedExam, setUpdatedExam } = useExamStore()
    const { showToast } = useToast()

    useEffect(() => {
        if (data && data.questionTemp) {
            const score = updatedExam?.[data.id] ? +updatedExam?.[data.id] : data?.grade || 0;
            setChoice(score?.toFixed(2) == data?.examQuestion?.score?.toFixed(2))
        }
    }, [data, updatedExam])

    const handleChangeChoice = (value: boolean) => {
        onConfirm({
            header: "Xác nhận",
            message: "Bạn có chắc chắn muốn thay đổi kết quả câu trả lời này?",
            onAccept: async () => {
                setChoice(value)
                const grade = value ? data.examQuestion.score : 0
                await updateSubmission(data.id, { grade });
                showToast({
                    severity: "success",
                    summary: "Thông báo",
                    message: "Thay đổi kết quả thành công.",
                    life: 3000
                })
                setUpdatedExam(data.id, grade.toString())
            }
        })
    }

    return <div>
        <div className='tw-text-sm tw-mb-2'>(Thay đổi kết quả sẽ không làm ảnh hưởng đến đáp án mà sinh viên chọn.)</div>
        <SelectButton value={choice} onChange={(e) => handleChangeChoice(e.value)} optionLabel="label" optionValue="value" options={choiceOptions} /></div>
}
const ResultCode = (props: any) => {
    const { data } = props;
    const [editable, setEditable] = useState(false)
    const [grade, setGrade] = useState(0)
    const { isLoadingApi } = useCommonStore()
    const { onConfirm } = useConfirm()
    const { updateSubmission, updatedExam, setUpdatedExam } = useExamStore()
    const { showToast } = useToast()

    useEffect(() => {
        if (data) {
            setGrade(+updatedExam?.[data.id] || data?.grade?.toFixed(2) || 0)
        }
    }, [data, updatedExam])

    const handleUpdate = () => {
        onConfirm({
            header: "Xác nhận",
            message: "Bạn có chắc chắn muốn thay đổi kết quả câu trả lời này?",
            onAccept: async () => {
                await updateSubmission(data.id, { grade: grade });
                showToast({
                    severity: "success",
                    summary: "Thông báo",
                    message: "Thay đổi kết quả thành công.",
                    life: 3000
                })
                setEditable(false)
                setUpdatedExam(data.id, grade.toString())
            }
        })
    }
    return <div className='tw-mt-2 tw-flex tw-items-center tw-gap-2'>
        <InputNumber onChange={(e) => setGrade(e.value as number)} disabled={!editable} className='tw-w-[80px]' inputClassName='tw-w-full' minFractionDigits={2} value={grade} />
        <Button severity={!editable ? undefined : 'contrast'} onClick={() => setEditable(!editable)} icon={!editable ? 'pi pi-pencil' : "pi pi-times"} tooltip={editable ? 'Thay đổi' : "Huỷ"} />
        {editable && <Button loading={isLoadingApi} severity='warning' onClick={handleUpdate} icon='pi pi-save' tooltip='Lưu thay đổi' />}
    </div>
}

type Props = {
    data: any
}
const PreviewResult: React.FC<Props> = ({ data }) => {
    return (
        <div className='tw-mb-4'>
            {data?.questionTemp.type == QuestionType.MULTIPLE_CHOICE && <ResultMultipleChoice key={data.id} data={data} />}
            {data?.questionTemp.type == QuestionType.CODE && <ResultCode key={data.id} data={data} />}
        </div>
    )
}

export default PreviewResult