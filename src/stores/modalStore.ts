import { create } from "zustand";

interface IModalState {
  visible: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  modalName: string;
  content: any;
  onToggle: (
    modalName: string,
    data: { header?: React.ReactNode; footer?: React.ReactNode; content?: any }
  ) => void;
  onDismiss: () => void;
}

export const useModalStore = create<IModalState>((set) => ({
  visible: false,
  modalName: "",
  content: {},
  onToggle: (modalName, data) => {
    set((state) => ({
      ...state,
      modalName: modalName,
      visible: !state.visible,
      ...data,
    }));
  },
  onDismiss: () => {
    set((state) => ({ ...state, visible: false }));
  },
}));
