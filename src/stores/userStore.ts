import { create } from "zustand";
import { assignPermissions, users } from "../constants";
import { AuthService } from "../services";
import { UserService } from "../services/userService";
import { IUser } from "../types/user";

interface IState {
  user: IUser;
  permissions: string[];

  getMe: () => Promise<void>;
}
interface IToast {
  message?: string;
  severity?:
    | "info"
    | "success"
    | "warning"
    | "danger"
    | "secondary"
    | "contrast";
  summary?: string;
  life?: number;
}

export const useUserStore = create<IState>((set) => ({
  user: {} as IUser,
  permissions: [],
  getMe: async () => {
    try {
      const resp = await UserService.getMe();
      const user = resp.user as IUser;
      const permissions = user.role.permissions.map(
        (item) => `${item.resource}:${item.action}`
      );

      set((state) => ({ ...state, user, permissions }));
    } catch (error) {
      console.log(error);
    }
  },
}));
