import React, { useMemo } from "react";
import { RadioButton } from "primereact/radiobutton";

interface Props {
    index: number,
    data: any,
    showResult: boolean
}

const PreviewMultiChoice: React.FC<Props> = ({ index, data, showResult }) => {


    const getStatusQuestion = (choice: any) => {
        if (!showResult) return ''
        if (choice.isCorrect) return 'tw-bg-green-500 tw-text-white'

        if (!choice.isCorrect && data.answer == choice.text) {
            return 'tw-bg-red-500 tw-text-white'
        }

        return ''
    }
    return <div className={"tw-animate-fade"}>
        <h2 className={"tw-font-bold"}>Câu hỏi {index + 1}</h2>
        <p className={"tw-mt-4"}>{data.questionTemp.title}</p>
        <div className={"tw-mt-1"} dangerouslySetInnerHTML={{ __html: data.questionTemp.content }}></div>
        <div className={"tw-mt-4 tw-space-y-2"}>
            {data.questionTemp.choices.map((choice: any, index: number) => (
                <div key={`choice-${index}`}
                    className={` tw-rounded py-1 ${getStatusQuestion(choice)}`}>
                    <RadioButton inputId={`choice-${index}`} name="choice" value={index + 1}
                        checked={data.answer === choice.text} disabled={true} />
                    <label htmlFor={`choice-${index}`} className="ml-2">{choice.text}</label>
                </div>
            ))}
        </div>
    </div>
}

export default React.memo(PreviewMultiChoice)