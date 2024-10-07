import React, { useMemo, useState } from 'react';
import { useCommonStore } from '../../stores';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';
import { sendUploadImage } from '../../apis';
import { useToast } from '../../hooks/useToast';

interface Props {
    value?: string,
    onChange?: (url: string) => void
}
const MyUploadSingleImage: React.FC<Props> = ({ value, onChange }) => {

    const { isLoadingUpload } = useCommonStore()
    const { showToast } = useToast()
    const id = useMemo(() => {
        return `upload-single-image-${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}`
    }, [])


    return (
        <div>
            {!value && <label htmlFor={id} className='tw-cursor-pointer'>
                <div className='tw-w-40 tw-h-40 tw-flex tw-justify-center relative tw-items-center   tw-bg-slate-50 tw-border-2 tw-rounded tw-border-dotted'>
                    {isLoadingUpload[id] ? <ProgressSpinner style={{ width: '30px', height: '30px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" /> : <i className='pi pi-plus'></i>}

                </div>
            </label>}
            {value &&
                <div className='tw-w-40 tw-h-40 tw-flex tw-justify-center relative tw-items-center   tw-bg-slate-50 tw-border-2 tw-rounded tw-border-dotted'>
                    <div>
                        <img src={value} alt="value" className='tw-w-full tw-h-full tw-object-cover' />
                        <Button size='small' onClick={() => onChange && onChange('')} className='absolute top-0 right-0' icon="pi pi-times" rounded text raised severity="danger" aria-label="Delete" />
                    </div>
                </div>
            }
            <input onChange={async (e) => {
                const files = e.target.files;
                if (files && files[0] && onChange) {
                    const currentFile = files[0];
                    const url = await sendUploadImage(currentFile, id);
                    if (!url) {
                        return showToast({
                            severity: "danger",
                            summary: "Upload image failed",
                            message: "Upload image failed",
                            life: 3000,
                        });
                    }
                    onChange && onChange(url);
                }
            }} id={id} type='file' hidden accept='image/*' />
        </div>
    );
};

export default React.memo(MyUploadSingleImage);
