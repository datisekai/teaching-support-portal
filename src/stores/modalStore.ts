import { create } from "zustand";

interface IModalState {
  visible: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  modalName: string;
  content: any;
  style: string;
  onToggle: (
    modalName: string,
    data: { header?: React.ReactNode; footer?: React.ReactNode; content?: any },
    style: string
  ) => void;
  onDismiss: () => void;
}

export const useModalStore = create<IModalState>((set) => ({
  visible: false,
  modalName: "",
  content: {},
  style: "",
  onToggle: (modalName, data, style) => {
    set((state) => ({
      ...state,
      modalName: modalName,
      visible: !state.visible,
      style: style,
      ...data,
    }));
  },
  onDismiss: () => {
    set((state) => ({ ...state, visible: false }));
  },
}));
