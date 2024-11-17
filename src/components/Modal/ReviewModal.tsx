import React, { useEffect } from "react";
import { useModalStore } from "../../stores";
import ExcelJS from "exceljs";
import { useToast } from "../../hooks/useToast";
const ReviewModal = () => {
  const { content } = useModalStore();

  return <div>{content}</div>;
};

export default ReviewModal;
