import { Dialog } from "primereact/dialog";
import { useEffect } from "react";
import { ModalName } from "../components/constants";
import PickListModal from "../components/Modal/PickListModal";
import TestModal from "../components/Modal/TestModal";
import ViewLetterModal from "../components/Modal/ViewLetterModal";
import { useModalStore } from "../stores/modalStore";
import FormItemPermissionModal from "../components/Modal/FormItemPermissionModal";

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
      className={`tw-w-[90%] md:tw-w-[50rem] ${style}`}
      onHide={onDismiss}
    >
      {modalName === ModalName.TEST && <TestModal />}
      {modalName === ModalName.PICK_LIST && <PickListModal />}
      {modalName === ModalName.VIEW_LETTER && <ViewLetterModal />}
      {modalName === ModalName.CREATE_PERMISSION && <FormItemPermissionModal />}
    </Dialog>
  );
};

export default DynamicModal;
