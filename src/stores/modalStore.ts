import { create } from "zustand";

interface IModalState {
  visible: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  modalName: string;
  content: any;
  style?: string;
  onToggle: (
    modalName: string,
    data: {
      header?: React.ReactNode;
      footer?: React.ReactNode;
      content?: any;
      style?: string;
    }
  ) => void;
  onDismiss: () => void;
  clearContent: () => void;
  setHeader: (header: React.ReactNode) => void;
}

export const useModalStore = create<IModalState>((set) => ({
  visible: false,
  modalName: "",
  content: null,
  style: "",
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
  clearContent: () => {
    set((state) => ({ ...state, content: null }));
  },
  setHeader: (header) => {
    set((state) => ({ ...state, header: header }));
  },
}));
