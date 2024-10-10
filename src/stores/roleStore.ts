import { create } from "zustand";
import { RoleService } from "../services/role";

interface IRole {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IRoleState {
  roles: IRole[];
  total: number;
  isLoadingRoles: boolean;
  fetchRoles: () => Promise<void>;
  addRole: (role: IRole) => Promise<boolean>;
  updateRole: (id: number, updatedRole: IRole) => Promise<boolean>;
  deleteRole: (id: number) => Promise<boolean>;
}

export const useRoleStore = create<IRoleState>((set) => ({
  roles: [],
  isLoadingRoles: false,
  total: 0,
  fetchRoles: async () => {
    const response = await RoleService.getAll();
    set({ roles: response.data });
    set({ total: response.total });
  },

  addRole: async (role: IRole) => {
    const response = await RoleService.create(role);
    if (response) {
      set((state) => ({
        roles: [response, ...state.roles],
      }));
    }
    return !!response;
  },

  updateRole: async (id: number, updatedRole: IRole) => {
    const response = await RoleService.update(id, updatedRole);
    if (response) {
      set((state) => ({
        roles: state.roles.map((role) => (role.id === id ? response : role)),
      }));
    }
    return !!response;
  },

  deleteRole: async (id: number) => {
    const response = await RoleService.delete(id);
    if (response) {
      set((state) => ({
        roles: state.roles.filter((role) => role.id !== id),
      }));
    }
    return !!response;
  },
}));
