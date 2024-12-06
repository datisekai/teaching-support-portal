import { create } from "zustand";
import { assignPermissions, users } from "../constants";
import { AuthService } from "../services";
import { IUser } from "../types/user";
import { UserService } from "../services/userService";
import { IStatistic } from "../types/statistic";

interface IState {
  user: IUser;
  permissions: string[];
  users: IUser[];
  total: number;
  userEdit: IUser;
  isLoadingUsers: boolean;
  statistic: IStatistic;
  fetchUsers: (body: object) => Promise<void>;
  fetchUser: (id: string) => Promise<void>;
  addUser: (user: IUser) => Promise<boolean>;
  updateUser: (id: number, updateduser: object) => Promise<boolean>;
  deleteUser: (id: number) => Promise<boolean>;
  getMe: () => Promise<void>;
  resetDevice: (id: number) => Promise<boolean>;
  getStatistic: () => Promise<void>;
  updateProfile: (body: any) => Promise<boolean>;
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

export const useUserStore = create<IState>((set, get) => ({
  user: {} as IUser,
  permissions: [],
  users: [],
  userEdit: {} as IUser,
  isLoadingUsers: false,
  total: 0,
  statistic: {
    openExamsCount: 0,
    pendingLetters: [],
    pendingLettersCount: 0,
    teachingClassesCount: 0,
  },
  getMe: async () => {
    try {
      const resp = await UserService.getMe();
      const user = resp.user as IUser;
      const permissions =
        user?.role?.permissions.map(
          (item) => `${item.resource}:${item.action}`
        ) || [];

      set((state) => ({ ...state, user, permissions }));
    } catch (error) {
      console.log(error);
    }
  },
  updateProfile: async (body) => {
    try {
      const resp = await UserService.updateProfile(body);
      set((state) => ({ ...state, user: resp.data }));
      get().getMe();
      return !!resp;
    } catch (error) {
      return false;
    }
  },
  fetchUsers: async (body) => {
    try {
      const response = await UserService.getAll(body);
      set({ users: response.data, total: response.total });
    } catch (error) {}
  },

  fetchUser: async (id: string) => {
    try {
      const response = await UserService.getSingle(id);
      set({ userEdit: response });
    } catch (error) {}
  },

  addUser: async (data: IUser) => {
    try {
      const response = await UserService.create(data);
      if (response) {
        set((state) => ({
          users: [response, ...state.users],
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },

  updateUser: async (id: number, updateItem: object) => {
    try {
      const response = await UserService.update(id, updateItem);
      if (response) {
        set((state) => ({
          users: state.users.map((item) => (item.id === id ? response : item)),
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },

  deleteUser: async (id: number) => {
    try {
      const response = await UserService.delete(id);
      if (response) {
        set((state) => ({
          users: state.users.filter((item) => item.id !== id),
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },
  resetDevice: async (id: number) => {
    try {
      const response = await UserService.resetDevice(id);
      if (response) {
        set((state) => ({
          users: state.users.map((item) => (item.id === id ? response : item)),
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },
  getStatistic: async () => {
    try {
      const response = await UserService.getStatistics();
      set({ statistic: response.data });
    } catch (error) {}
  },
}));
