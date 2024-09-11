import { create } from "zustand";

interface IAction {
  title: string;
  icon: string;
  onClick: () => void;
  type: string;
  disabled: boolean;
}
interface ICommonState {
  isLoadingApi: boolean;
  header: {
    title: string;
    actions: IAction[];
  };
  setHeaderTitle: (title: string) => void;
  setHeaderActions: (actions: IAction[]) => void;
}

export const useCommonStore = create<ICommonState>((set) => ({
  isLoadingApi: false,
  header: {
    title: "",
    actions: [],
  },
  setHeaderTitle: (title: string) => {
    set((state) => ({ ...state, header: { ...state.header, title } }));
  },
  setHeaderActions: (actions: IAction[]) => {
    set((state) => ({ ...state, header: { ...state.header, actions } }));
  },
}));
