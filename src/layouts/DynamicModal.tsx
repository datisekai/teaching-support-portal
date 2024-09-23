import { Dialog } from "primereact/dialog";
import React, { useEffect } from "react";
import { useModalStore } from "../stores/modalStore";
import { ModalName } from "../components/constants";
import TestModal from "../components/Modal/TestModal";
import PickListModal from "../components/Modal/PickListModal";

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
      {modalName === ModalName.PICKLIST && <PickListModal />}
    </Dialog>
  );
};

export default DynamicModal;
