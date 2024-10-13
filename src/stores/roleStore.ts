import { create } from "zustand";
import { RoleService } from "../services/roleService";
import { IRole } from "../types/user";

interface IRoleState {
  roles: IRole[];
  role: IRole | null;
  total: number;
  isLoadingRoles: boolean;
  fetchRoles: (body: object) => Promise<void>;
  fetchRole: (id: number) => Promise<void>;
  updateRolePermissions: (
    id: number,
    permissions: number[]
  ) => Promise<boolean>;
  addRole: (role: IRole) => Promise<boolean>;
  updateRole: (id: number, updatedRole: IRole) => Promise<boolean>;
  deleteRole: (id: number) => Promise<boolean>;
}

export const useRoleStore = create<IRoleState>((set) => ({
  roles: [],
  role: null,
  isLoadingRoles: false,
  total: 0,

  fetchRoles: async (body) => {
    try {
      const response = await RoleService.getAll(body);
      set({ roles: response.data, total: response.total });
    } catch (error) {}
  },

  fetchRole: async (id: number) => {
    try {
      const response = await RoleService.getSingle(id);
      set({ role: response });
    } catch (error) {}
  },

  updateRolePermissions: async (id: number, permissionIds: number[]) => {
    try {
      const response = await RoleService.updateRolePermissions(
        id,
        permissionIds
      );
      if (response) {
        set({ role: response });
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },

  addRole: async (role: IRole) => {
    try {
      const response = await RoleService.create(role);
      if (response) {
        set((state) => ({
          roles: [response, ...state.roles],
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },

  updateRole: async (id: number, updatedRole: IRole) => {
    try {
      const response = await RoleService.update(id, updatedRole);
      if (response) {
        set((state) => ({
          roles: state.roles.map((role) => (role.id === id ? response : role)),
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },

  deleteRole: async (id: number) => {
    try {
      const response = await RoleService.delete(id);
      if (response) {
        set((state) => ({
          roles: state.roles.filter((role) => role.id !== id),
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },
}));
