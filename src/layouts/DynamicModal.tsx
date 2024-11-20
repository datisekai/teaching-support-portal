import { Dialog } from "primereact/dialog";
import { useEffect } from "react";
import { ModalName } from "../constants";
import TestModal from "../components/Modal/TestModal";
import ViewLetterModal from "../components/Modal/ViewLetterModal";
import { useModalStore } from "../stores/modalStore";
import FormItemPermissionModal from "../components/Modal/FormItemPermissionModal";
import AddTeacherModal from "../components/Modal/AddTeacherModal";
import ViewQuestionModal from "../components/Modal/ViewQuestionModal";
import AttendanceModal from "../components/Modal/AttendanceModal";
import LinkStudentScore from "../components/Modal/LinkStudentScore";
import ReviewModal from "../components/Modal/ReviewModal";
import ChooseQuestion from "../components/Modal/ChooseQuestion";
import AutoFillQuestion from "../components/Modal/AutoFillQuestion";

const DynamicModal = () => {
  const { modalName, onDismiss, onToggle, visible, footer, header, style } =
    useModalStore();

  useEffect(() => {
    if (visible) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [visible]);
  return (
    <Dialog
      visible={visible}
      modal
      header={header}
      footer={footer}
      className={`tw-w-[90%] md:tw-w-[50rem] ${style} modal-${modalName}`}
      onHide={onDismiss}
    >
      {modalName === ModalName.TEST && <TestModal />}
      {modalName === ModalName.VIEW_LETTER && <ViewLetterModal />}
      {modalName === ModalName.CREATE_PERMISSION && <FormItemPermissionModal />}
      {modalName === ModalName.ADD_TEACHER && <AddTeacherModal />}
      {modalName === ModalName.ATTENDANCE && <AttendanceModal />}
      {modalName === ModalName.VIEW_QUESTION && <ViewQuestionModal />}
      {modalName === ModalName.LINK_STUDENT_SCORE && <LinkStudentScore />}
      {modalName === ModalName.REVIEW_IMPORT && <ReviewModal />}
      {modalName === ModalName.CHOOSE_QUESTION && <ChooseQuestion />}
      {modalName === ModalName.AUTOFILL_QUESTION && <AutoFillQuestion />}
    </Dialog>
  );
};

export default DynamicModal;
