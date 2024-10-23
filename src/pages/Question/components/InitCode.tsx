import React, { useMemo } from 'react'
import { ILanguage } from '../../../types/language'
import { useCommonStore, useLanguageStore } from '../../../stores'
import { useToast } from '../../../hooks/useToast'
import MyCard from '../../../components/UI/MyCard'
import { TabPanel, TabView } from 'primereact/tabview'
import { Editor } from '@monaco-editor/react'
import MyLoading from '../../../components/UI/MyLoading'
import { googleAIService } from '../../../services/googleAIService'

interface IProps {
    languages: string[],
    testcases: { input: string, expectedOutput: string }[],
    setInitCode: (value: any) => void,
    code: any;
}
const InitCode: React.FC<IProps> = ({ languages, code, setInitCode, testcases }) => {
    const { languages: allLanguages } = useLanguageStore()
    const { isLoadingApi } = useCommonStore()
    const { showToast } = useToast()

    const selectedLanguages = useMemo(() => {
        if (!languages) return []

        const newLanguages: ILanguage[] = []
        languages.forEach(id => {
            const language = allLanguages.find(item => item.id == +id)
            if (language) newLanguages.push(language)
        })

        return newLanguages
    }, [languages?.length])

    const handleInitCode = async () => {
        if (selectedLanguages.length == 0) {
            return showToast({
                message: "Vui lòng chọn ngôn ngữ thực hiện",
                severity: 'info',
                summary: "Thông báo"
            })
        }

        if (testcases.length == 0 || testcases[0].input == "" || testcases[0].expectedOutput == "") {
            return showToast({
                message: "Vui lòng nhập test case",
                severity: 'info',
                summary: "Thông báo"
            })
        }

        const input = testcases[0].input;
        // const generateLanguages = selectedLanguages.filter(item => !initCode[item.id])
        Promise.allSettled(selectedLanguages.map(item => googleAIService.generateCode(item.name, input)))
            .then(results => {
                const newInitCode: any = { ...code }
                results.forEach((result, index) => {
                    if (result.status == "fulfilled") {
                        const { data } = result.value;
                        const languageId = selectedLanguages[index].id;
                        newInitCode[languageId] = data;
                    }
                })

                setInitCode(newInitCode)
            })
    }

    return (
        <MyCard title="Code khởi tạo" tooltip={<div>
            <ul className="">
                <li>Bạn cần chọn ngôn ngữ lập trình và nhập testcase trước.</li>
                <li>Chọn "Khởi tạo", hệ thống sẽ tạo ra các đoạn code khởi tạo đầu vào cho từng ngôn ngữ</li>
                <li>Code sẽ khởi tạo theo input của test case đầu tiên</li>
            </ul>
        </div>} action={{ title: "Khởi tạo", onClick: handleInitCode, }}>

            <MyLoading isLoading={isLoadingApi}>
                {selectedLanguages.length == 0 && <p className="tw-text-center">Vui lòng chọn ngôn ngữ lập trình thực hiện và nhập test case</p>}
                {selectedLanguages.length > 0 && <TabView scrollable >
                    {selectedLanguages.map((item) => {
                        return <TabPanel header={item.name} key={item.id}>
                            <Editor className='tw-w-full' onChange={(e) => {
                                setInitCode({ ...code, [item.id]: e })
                            }} height="40vh" defaultLanguage={item.name.split(" ")[0].toLowerCase()} value={code[item.id]} defaultValue={"// some comment"} />;
                        </TabPanel>
                    })}
                </TabView>}
            </MyLoading>
        </MyCard>
    )
}

export default InitCode