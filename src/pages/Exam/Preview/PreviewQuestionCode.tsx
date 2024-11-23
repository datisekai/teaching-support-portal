import Editor from '@monaco-editor/react';
import { decode } from 'js-base64';
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useEffect, useMemo, useState } from "react";
import { useLanguageStore } from "../../../stores/languageStore.ts";
import { zeroPad } from "../../../utils";
import { TabPanel, TabView } from 'primereact/tabview';

interface Props {
    index: number,
    data: any,
    showResult: boolean
}


const PreviewQuestionCode: React.FC<Props> = ({ data, index, showResult }) => {
    const { title, content, acceptedLanguages, initCode, testCases } = data.questionTemp;
    const languages = useLanguageStore(state => state.languages);
    const [defaultLanguage, setDefaultLanguage] = useState<{ id: number, name: string }>({ name: '', id: 0 })

    const editorLanguageName = useMemo(() => {
        if (defaultLanguage && defaultLanguage.name) return defaultLanguage.name.split(" ")[0].toLowerCase();
        return ''
    }, [defaultLanguage])

    useEffect(() => {
        const language = languages?.find(item => item.id == data.languageId);
        if (language) {
            setDefaultLanguage(language)
        }
    }, [data, languages])

    const getTestcaseResult = (result: any) => {
        if (!result) return "Không có"
        if (result.stdout) return decode(result.stdout);
        if (result.compile_output) return decode(result.compile_output);
        return result.stderr;
    }

    return <div className={"tw-animate-fade-right tw-animate-once tw-flex tw-flex-col xl:tw-flex-row tw-gap-2"}>
        <div className={"tw-w-full xl:tw-w-[30%]"}>
            <h2 className={"tw-font-bold"}>Câu hỏi {index + 1}</h2>
            <p className={"tw-mt-2"}>{title}</p>
            <div className={"tw-mt-1"} dangerouslySetInnerHTML={{ __html: content }}></div>
            <div className={"tw-space-y-4 tw-mt-4"}>
                {testCases?.map((testcase: any, index: number) => <div>
                    <div className={'tw-flex tw-gap-2 tw-mb-2 tw-items-center'} key={index}>
                        <div
                            className={"bg-primary tw-flex tw-items-center tw-justify-center tw-rounded-full tw-border tw-size-[30px]"}>{zeroPad(index + 1, 2)}</div>
                        <div className={"tw-font-bold"}>Test {zeroPad(index + 1, 2)}</div>
                    </div>
                    <div className={"tw-flex tw-gap-2"}>
                        <div className={"tw-flex-1"}>
                            <div>Đầu vào</div>
                            <InputTextarea readOnly={true} value={testcase.input} rows={3} cols={15}
                                className={"tw-w-full tw-bg-gray-50"} />
                        </div>
                        <div className={"tw-flex-1"}>
                            <div>Kết quả</div>
                            <InputTextarea readOnly={true} value={testcase.expectedOutput} rows={3} cols={15}
                                className={"tw-w-full tw-bg-gray-50"} />
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
        <div className={"tw-flex-1 tw-border-l-2 tw-px-4 overflow-x-auto"}>
            <Editor options={{ readOnly: true }} height="40vh" defaultLanguage={editorLanguageName}
                value={data.code} />
            {Object.keys(data.resultJudge0).length > 0 && <div>
                <div className={"tw-font-bold"}>Kết quả run code:</div>
                <TabView className={'tw-bg-gray-50 tw-space-y-1 tw-mt-4 p-4'}>
                    {testCases?.map((testcase: any, index: number) => <TabPanel key={index}
                        header={<div>
                            <i
                                className={`pi ${data.resultJudge0[testcase.id]?.status.id === 3 ? 'pi-check tw-text-green-500' : 'pi-times tw-text-red-500'}`}
                                style={{
                                    fontSize: '1rem',
                                    marginRight: 4,
                                }}
                            ></i>
                            Testcase {zeroPad(index + 1, 2)}


                        </div>}>
                        {getTestcaseResult(data.resultJudge0[testcase.id])}
                    </TabPanel>)}
                </TabView>
            </div>}
        </div>

    </div>
}

export default React.memo(PreviewQuestionCode)