import { create } from "zustand";

interface IAction {
  title: string;
  icon: string;
  onClick: () => void;
  type: "button" | "file";
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
  setLoading: (isLoading: boolean) => void;
}

export const useCommonStore = create<ICommonState>((set) => ({
  isLoadingApi: false,
  header: {
    title: "Dashboard",
    actions: [],
  },
  setHeaderTitle: (title: string) => {
    set((state) => ({
      header: {
        ...state.header,
        title,
      },
    }));
  },
  setHeaderActions: (actions: IAction[]) => {
    set((state) => ({
      header: {
        ...state.header,
        actions,
      },
    }));
  },
  setLoading: (isLoading: boolean) => {
    set(() => ({ isLoadingApi: isLoading }));
  },
}));
