import React from "react";
import { useModalStore } from "../../stores";

const ViewQuestionModal: React.FC = () => {
  const { content } = useModalStore();

  return (
    <div className="">
      <p className="tw-mb-4">
        <strong>Câu hỏi:</strong> {content.topic}
      </p>
      <p className="tw-mb-4">
        <strong>Nội dung:</strong>
        <div dangerouslySetInnerHTML={{ __html: content.content }} />
      </p>
      <p className="tw-mb-4">
        <strong>Đáp án đúng:</strong> {content.correctAnswer}
      </p>
    </div>
  );
};

export default ViewQuestionModal;
