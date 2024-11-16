import React, { useMemo, useState } from 'react'
import { useAttendanceStore, useModalStore } from '../../../stores';
import { Checkbox } from 'primereact/checkbox';
import { useClassStore } from '../../../stores/classStore';
import { InputNumber } from 'primereact/inputnumber';

type Props = {
    hashAttendance: any;
    setHashAttendance: any
    hashCurrentScore: any
    score: number,
    setScore: any
}
const Step3Attendance: React.FC<Props> = ({ hashCurrentScore, hashAttendance, setHashAttendance, score, setScore }) => {
    const { content } = useModalStore()
    const { students } = useClassStore()

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
                width: 100,

            },
            {
                label: 'Họ và tên',
                prop: 'name',
                width: 150,

            },
            {
                label: "Điểm hiện tại",
                prop: 'current_score',
                width: 120,
                render: (data: any) => {
                    return <div>{hashCurrentScore[data.code]?.[content.id]?.score?.toFixed(2) || 0.00}</div>
                }
            },
            {
                label: "Điểm danh",
                prop: 'status',
                width: 100,
                render: (data: any) => {
                    return <Checkbox onChange={e => setHashAttendance({
                        ...hashAttendance, [data.id]: {
                            ...hashAttendance[data.id],
                            isSuccess: e.checked
                        }
                    })} checked={!!hashAttendance?.[data.id]?.isSuccess}></Checkbox>
                }
            },
            {
                label: 'Điểm mới',
                prop: 'new_score',
                width: 100,
                render: (data: any) => {
                    const oldScore = hashCurrentScore[data.code]?.[content.id]?.score?.toFixed(2) || 0.00
                    const newScore = +oldScore + +score
                    return <InputNumber className='input-modal-link' value={hashAttendance[data.id] ? newScore : oldScore} disabled={true} minFractionDigits={2} />
                }
            }

        ]

    }, [hashCurrentScore, hashAttendance, score])

    return (
        <div>
            <div className='tw-flex tw-justify-end tw-mb-2'>
                <div>
                    <div className='tw-mb-1'>Điểm sẽ cộng</div>
                    <InputNumber className='input-modal-link' value={score} onChange={(e) => setScore(e.value || 0)} minFractionDigits={2} /></div></div>
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
        </div>
    )
}

export default Step3Attendance