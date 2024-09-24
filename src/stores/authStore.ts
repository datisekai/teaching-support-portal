import { create } from "zustand";

interface IUser {
  code: string;
  permissions: string[];
}

interface IState {
  token: string;
  user: IUser;
  login: (code: string, password: string) => Promise<IUser>;
}

export const useAuthStore = create<IState>((set) => ({
  token: "",
  user: {
    permissions: [
      "view-class",
      "view-department",
      "view-subject",
      "view-attendance",
      "view-user",
      "view-notification",
      "view-letter",
    ],
    code: "3120410115",
  } as IUser,
  login: async (code: string, password: string) => {
    return {} as IUser;
  },
}));
