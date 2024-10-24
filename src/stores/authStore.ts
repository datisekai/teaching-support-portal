import { create } from "zustand";
import { assignPermissions, localKey, pathNames, users } from "../constants";
import { AuthService } from "../services";
import { useUserStore } from "./userStore";
import { getObjectLocalData, setObjectLocalData } from "../utils";
import { useNavigate } from "react-router-dom";

interface IState {
  token: string;
  login: (code: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<IState>((set) => ({
  token: getObjectLocalData(localKey.TOKEN) || "",
  login: async (code: string, password: string) => {
    const result = await AuthService.login(code, password);
    if (result) {
      const token = result.accessToken;
      setObjectLocalData(localKey.TOKEN, token);
      set((state) => ({ ...state, token }));
      useUserStore.getState().getMe();
    }

    return !!result;
  },
  logout: () => {
    setObjectLocalData(localKey.TOKEN, "");
    set((state) => ({ ...state, token: "" }));
  },
}));
