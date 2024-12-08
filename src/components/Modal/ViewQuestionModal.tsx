import React, { useState, useEffect } from "react";
import { useModalStore } from "../../stores";
import { generateCharacter } from "../../utils";
import { QuestionType } from "../../constants";

const ViewQuestionModal: React.FC = () => {
  const { content } = useModalStore();
  const [answerCorrect, setAnswerCorrect] = useState<string>("");

  useEffect(() => {
    const correctChoice = content?.choices?.find(
      (choice: any) => choice.isCorrect
    );
    if (correctChoice) {
      setAnswerCorrect(correctChoice.text);
    }
  }, [content.choices]);

  return (
    <div>
      <p className="tw-mb-4">
        <strong>Câu hỏi:</strong> {content.title}
      </p>
      <p className="tw-mb-4">
        <strong>Nội dung:</strong>
        <div dangerouslySetInnerHTML={{ __html: content.content }} />
      </p>

      {content?.type === QuestionType.MULTIPLE_CHOICE && content?.choices?.length > 0 && (
        <p className="tw-mb-4">
          <strong>Câu trả lời:</strong>
        </p>
      ) &&
        content.choices.map((choice: any, index: number) => (
          <p className={`tw-mb-4 ${choice.isCorrect ? "tw-font-bold tw-bg-green-500 tw-text-white" : ""}`} key={index}>
            {generateCharacter(index)}. {choice.text}
          </p>
        ))}
      {/* {answerCorrect && (
        <p className="tw-mb-4">
          <strong>Đáp án đúng:</strong> {answerCorrect}
        </p>
      )} */}
    </div>
  );
};

export default ViewQuestionModal;
