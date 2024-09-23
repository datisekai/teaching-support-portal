import { create } from "zustand";

export interface IAction {
  title?: string;
  icon?: string;
  onClick?: () => void;
  type?: "button" | "file";
  disabled?: boolean;
  iconPos?: "right" | "left";
  severity?: "success" | "info" | "warning" | "danger" | "help" | "secondary";
  loading?: boolean;
  action?: "back";
  tooltip?: string;
}

interface ICommonState {
  isLoadingApi: boolean;
  header: {
    title: string;
    actions: IAction[];
  };
  footer: {
    actions: IAction[];
  };
  setHeaderTitle: (title: string) => void;
  setHeaderActions: (actions: IAction[]) => void;
  setFooterActions: (actions: IAction[]) => void;
  setLoading: (isLoading: boolean) => void;
  resetActions: () => void;
}

export const useCommonStore = create<ICommonState>((set) => ({
  isLoadingApi: false,
  header: {
    title: "Dashboard",
    actions: [],
  },
  footer: {
    actions: [],
  },
  modal: {
    visible: false,
    footer: "",
    header: "",
  },
  setHeaderTitle: (title: string) => {
    set((state) => ({
      ...state,
      header: {
        ...state.header,
        title,
      },
    }));
  },
  setHeaderActions: (actions: IAction[]) => {
    set((state) => ({
      ...state,
      header: {
        ...state.header,
        actions,
      },
    }));
  },
  setFooterActions: (actions: IAction[]) => {
    set((state) => ({
      ...state,
      footer: {
        ...state.footer,
        actions: actions,
      },
    }));
  },
  setLoading: (isLoading: boolean) => {
    set((state) => ({ ...state, isLoadingApi: isLoading }));
  },
  resetActions: () => {
    set((state) => ({
      ...state,
      header: { ...state.header, actions: [] },
      footer: { ...state.footer, actions: [] },
    }));
  },
}));
