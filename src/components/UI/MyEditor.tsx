import { Editor } from '@tinymce/tinymce-react'
import React, { useMemo } from 'react'
import { sendUploadImage } from '../../apis'
import { useToast } from '../../hooks/useToast'
import { BASE_URL } from '../../constants'

interface Props {
    height?: number,
    value: string,
    onChange: (value: string) => void,
}
const MyEditor: React.FC<Props> = ({ onChange, value, height }) => {
    const { showToast } = useToast()

    return (
        <Editor
            value={value}
            onEditorChange={e => onChange(e)}
            apiKey='no-api-key'
            init={{
                height: height || 500,
                plugins: "advlist autolink lists link image charmap preview anchor media table code help wordcount lists media searchreplace visualblocks code fullscreen".split(
                    " "
                ),
                fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
                font_formats:
                    "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
                image_title: true,
                automatic_uploads: true,
                media_live_embeds: true,
                menubar: "file edit view insert format tools table help",
                toolbar:
                    // eslint-disable-next-line no-multi-str
                    "undo redo blocks bold italic underline fontfamily fontsize forecolor backcolor\
            alignleft aligncenter alignright alignjustify  \
            bullist numlist outdent indent removeformat link  customImageButton image \
            ",

                content_css: [
                    "//fonts.googleapis.com/css?family=Lato:300,300i,400,400i"
                ],
                images_upload_handler: async (blobInfo: any) => {
                    const file = blobInfo?.blob()
                    return new Promise((resolve, reject) => {
                        sendUploadImage(file)
                            .then(data => {
                                resolve(`${BASE_URL}/${data}`);
                            })
                            .catch(e => {
                                showToast({
                                    severity: "danger",
                                    summary: "Upload image failed",
                                    message: "Upload image failed",
                                    life: 3000,
                                });
                                reject(e);
                            });
                    });
                },
            }}
        />
    )
}

export default React.memo(MyEditor)