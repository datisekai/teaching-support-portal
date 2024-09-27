import { create } from "zustand";
import { assignPermissions, users } from "../components/constants";

interface IUser {
  code: string;
  permissions: string[];
}

interface IState {
  token: string;
  user: IUser;
  login: (
    code: string,
    password: string,
    showToast: (data: any) => void
  ) => Promise<IUser>;
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

export const useAuthStore = create<IState>((set) => ({
  token: "",
  user: {} as IUser,
  login: async (
    code: string,
    password: string,
    showToast: (data: IToast) => void
  ) => {
    const result = users.find(
      (user) => user.code === code && user.password === password
    );

    if (!result) {
      showToast({
        severity: "danger",
        summary: "Thông báo",
        message: "Sai tài khoản hoặc mật khẩu",
        life: 3000,
      });
      return {} as IUser;
    }

    showToast({
      severity: "success",
      summary: "Thông báo",
      message: "Đăng nhập thành công",
      life: 3000,
    });

    const resultPermission = assignPermissions.find(
      (permission) => permission.role === result.role
    );

    set({
      user: {
        code: result.code,
        permissions: resultPermission?.permissions || [],
      },
    });

    return {
      code: result.code,
      permissions: resultPermission?.permissions,
    } as IUser;
  },
}));
