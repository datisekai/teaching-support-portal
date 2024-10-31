import React, { useState, useEffect } from "react";
import { useModalStore } from "../../stores";

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

      {content?.choices?.length > 0 && (
          <p className="tw-mb-4">
            <strong>Câu trả lời:</strong>
          </p>
        ) &&
        content.choices.map((choice: any, index: number) => (
          <p className="tw-mb-4" key={index}>
            {choice.text}
          </p>
        ))}
      {answerCorrect && (
        <p className="tw-mb-4">
          <strong>Đáp án đúng:</strong> {answerCorrect}
        </p>
      )}
    </div>
  );
};

export default ViewQuestionModal;
