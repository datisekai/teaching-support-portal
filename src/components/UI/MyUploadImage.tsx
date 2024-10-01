
import { Button } from 'primereact/button';
import { FileUpload, FileUploadHeaderTemplateOptions, ItemTemplateOptions } from 'primereact/fileupload';
import { Tag } from 'primereact/tag';
import { Tooltip } from 'primereact/tooltip';
import { useRef, useState } from 'react';
import { apiConfig, sendFormData } from '../../apis';
import { useToast } from '../../hooks/useToast';


interface Props {
    onChange: (url: string) => void;
    value?: string;
}
const MyUploadImage: React.FC<Props> = ({ onChange, value = '' }) => {
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef<FileUpload>(null);
    const { showToast } = useToast()

    const onTemplateRemove = (file: File, callback: Function) => {
        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };

    const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
            </div>
        );
    };

    const itemTemplate = (inFile: object, props: ItemTemplateOptions) => {
        const file = inFile as any;
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{ width: '40%' }}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                    Drag and Drop Image Here
                </span>
            </div>
        );
    };

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

    const uploadFileHandler = ({ files }: any) => {
        const [file] = files;
        uploadFile(file);
    };


    const uploadFile = async (file: any) => {
        let formData = new FormData();
        formData.append('image', file);

        try {
            const response = await sendFormData({
                body: formData, endpoint: apiConfig.upload.endpoint, method: apiConfig.upload.method
            })
            onChange(response.data.url);
            showToast({ message: "Upload image success", severity: "success" });
        } catch (error) {
            showToast({ message: "Upload image failed", severity: "danger" });
            console.log('error', error);
        }
    };
    return (
        <div>

            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

            <FileUpload ref={fileUploadRef} name="upload[]" customUpload={true}
                uploadHandler={uploadFileHandler}
                accept="image/*"
                onError={onTemplateClear} onClear={onTemplateClear}
                headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
        </div>
    )
}


export default MyUploadImage;