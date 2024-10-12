import React, { useEffect, useState } from 'react'
import { useModalStore } from '../../stores/modalStore'
import { useSocketStore } from '../../stores/socketStore'
import { SocketMessage } from '../../constants'
import { ISocketResponse } from '../../types/socket'
import { useToast } from '../../hooks/useToast'
import dayjs from 'dayjs'
import { Button } from 'primereact/button'

const AttendanceModal = () => {
    const { content, modalName } = useModalStore()
    const { socket } = useSocketStore()
    const { showToast } = useToast()
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        socket?.emit(SocketMessage.JOIN_OR_CREATE, { classId: content.class.id, secretKey: content.secretKey, id: content.id }, (response: ISocketResponse) => {
            console.log('response,', response);
            const { message, success, data } = response;
            showToast({
                summary: "Thông báo", message,
                severity: success ? 'success' : 'danger'
            })
        })

    }, [])

    const enterFullscreen = () => {
        const elem: any = document.querySelector(`.modal-${modalName}`);
        console.log('elem', elem, modalName);
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { // Firefox
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { // IE/Edge
            elem.msRequestFullscreen();
        }
        setIsFullscreen(true);
    };

    const exitFullscreen = () => {
        if ((document as any).exitFullscreen) {
            (document as any).exitFullscreen();
        } else if ((document as any).mozCancelFullScreen) { // Firefox
            (document as any).mozCancelFullScreen();
        } else if ((document as any).webkitExitFullscreen) { // Chrome, Safari and Opera
            (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) { // IE/Edge
            (document as any).msExitFullscreen();
        }
        setIsFullscreen(false);
    };

    return (
        <div className='tw-flex tw-items-center'>
            <div className={`tw-w-[50%]`}>

                <div className='tw-space-y-1'>
                    <div>
                        Tiêu đề: <span className='tw-font-semibold'>{content.title}</span>
                    </div>
                    <div>
                        Ngày điểm danh: <span className='tw-font-semibold'>{dayjs(content.updatedAt).format('DD/MM/YYYY HH:mm')}</span>
                    </div>
                    <div>
                        Môn học: <span className='tw-font-semibold'>{content.class.major.name}</span>
                    </div>
                    <div>
                        Lớp học: <span className='tw-font-semibold'>{content.class.name}</span>
                    </div>
                    <div>
                        Giảng viên: <span className='tw-font-semibold'>{content.class.teachers.map((item: any) => item.name).join(',')}</span>
                    </div>
                </div>
                <div className='tw-flex  tw-flex-wrap tw-items-center tw-gap-2 tw-mt-4'>
                    <Button severity='info' label='Bắt đầu'></Button>
                    <Button severity='danger' label='Huỷ'></Button>
                    <Button onClick={isFullscreen ? exitFullscreen : enterFullscreen} label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}></Button>
                </div>
            </div>
            <div className='tw-aspect-[1/1] tw-bg-slate-300 tw-flex-1 tw-border tw-rounded-lg tw-flex tw-justify-center tw-items-center'>
                <div className='tw-font-semibold'>Để điểm danh, hãy click bắt đầu</div>
            </div>
        </div>
    )
}

export default AttendanceModal