import React, { useEffect, useMemo, useState } from 'react'
import { useExamStore } from '../../../stores/examStore'
import { useClassStore } from '../../../stores/classStore'
import { InputNumber } from 'primereact/inputnumber'
import { Button } from 'primereact/button'
import { useCommonStore, useModalStore } from '../../../stores'
import { usestudentScoreStore } from '../../../stores/studentScoreStore'
import { useToast } from '../../../hooks/useToast'
import { useParams } from 'react-router-dom'

type Props = {
    type: string,
    refId: number
}
const Step3: React.FC<Props> = ({ refId, type }) => {

    const { getHistory, examHistorys } = useExamStore()
    const { students } = useClassStore()
    const [hashScore, setHashScore] = useState<any>({})
    const { isLoadingApi } = useCommonStore()
    const { content, onDismiss } = useModalStore()
    const { linkStudentScore, fetchstudentScore } = usestudentScoreStore()
    const { showToast } = useToast()
    const { id } = useParams()


    useEffect(() => {
        if (type == 'exam' && refId) {
            getHistory(refId.toString())
        }
    }, [type, refId])


    useEffect(() => {
        if (examHistorys) {
            const hash: any = {}
            for (const item of examHistorys) {
                hash[item.user_code] = item
            }
            for (const item of students) {
                hash[item.code] = {
                    ...hash[item.code],
                    user_id: (item as any).id
                }
            }
            setHashScore(hash)
        }
    }, [examHistorys, students])


    const tableSchemas = useMemo(() => {
        return [
            {
                label: '#',
                prop: 'index',
                width: 40,
                render: (data: any, index: number) => index + 1
            },
            {
                label: 'MSSV',
                prop: 'code',
                width: 100
            },
            {
                label: 'Họ và tên',
                prop: 'name',
                width: 150
            },
            {
                label: "Điểm",
                width: 100,
                render: (data: any) => {
                    return <InputNumber min={0} max={10} className='input-modal-link' onValueChange={e => setHashScore({ ...hashScore, [data.code]: { ...hashScore[data.code], grade: e.value } })} value={hashScore[data.code]?.grade || 0} />
                }
            },
            {
                label: "Hành động",
                prop: "action",
                type: "text",
                render(data: any) {
                    console.log('data', data);
                    const { outTabCount = 0, mouseRight = 0, controlCVX = 0 } = hashScore[data.code] || {};
                    return <>
                        <p><strong>{outTabCount} lần</strong>  chuyển tab.</p>
                        <p><strong>{mouseRight} lần</strong>  click chuột phải.</p>
                        <p><strong>{controlCVX} lần</strong>  Control C, V, X.</p>
                    </>
                },
            },

        ]

    }, [hashScore])

    console.log('hashScore', hashScore);

    const handleLink = async () => {
        const payload = []
        for (const key in hashScore) {
            const item = hashScore[key];
            payload.push({ studentId: item.userId || item.user_id, score: item.grade || 0, scoreColumnId: content.id })
        }

        const result = await linkStudentScore(payload);
        if (result) {
            onDismiss()
            showToast({
                severity: "success",
                summary: "Thành công",
                message: "Liên kết điểm thành công",
                life: 3000,
            })
            fetchstudentScore(id as string);
            return;
        }
        showToast({
            severity: "error",
            summary: "Thông báo",
            message: "Liên kết điểm thất bại",
            life: 3000,
        })
    }

    return (
        <div>
            <div className="tw-overflow-x-auto">
                <div className="tw-flex tw-bg-[#f9fafb] tw-border-t tw-border-b tw-px-2">
                    {tableSchemas.map((item: any, index: number) => {
                        return <div className="tw-font-bold tw-py-4 tw-text-[#374151]" key={item.prop} style={{ width: item.width }}>{item.renderHeader ? item.renderHeader() : item.label}</div>;
                    })}
                </div>
                <div>
                    {students?.map((item: any, index: number) => {
                        return <div key={item.id} className="tw-flex tw-py-4 tw-border-b tw-px-2 tw-items-center">
                            {tableSchemas?.map(cell => {
                                return <div key={`${cell.prop}_${item.id}`} style={{ width: cell.width }}>{cell.render ? cell.render(item, index) : item[cell.prop] || ""}</div>
                            })}
                        </div>
                    })}
                </div>
            </div>
            <div className='tw-flex tw-justify-end tw-mt-4'>
                <Button loading={isLoadingApi} onClick={handleLink} label='Liên kết điểm'></Button>
            </div>
        </div>
    )
}

export default Step3