import { Dialog } from 'primereact/dialog';
import React from 'react'
import { useModalStore } from '../stores/modalStore';
import { ModalName } from '../components/constants';
import TestModal from '../components/Modal/TestModal';

const DynamicModal = () => {
    const { modalName, onDismiss, onToggle, visible, footer, header } = useModalStore()
    return (
        <Dialog visible={visible} modal header={header} footer={footer} className='tw-w-[90%] md:tw-w-[50rem]' onHide={onDismiss}>
            {modalName === ModalName.TEST && <TestModal />}
        </Dialog>
    )
}

export default DynamicModal