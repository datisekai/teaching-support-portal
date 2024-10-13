import { create } from "zustand";
import { permissionService } from "../services/permissionService";
import { IPermission } from "../types/user";

interface IPermissionState {
  permissions: IPermission[];
  permission: IPermission | null;
  isLoadingPermissions: boolean;
  fetchPermissions: () => Promise<void>;
  fetchPermission: (id: number) => Promise<void>;
  addPermission: (Permission: IPermission) => Promise<boolean>;
  updatePermission: (
    id: number,
    updatedPermission: IPermission
  ) => Promise<boolean>;
  deletePermission: (id: number) => Promise<boolean>;
}

export const usePermissionStore = create<IPermissionState>((set) => ({
  permissions: [],
  isLoadingPermissions: false,
  permission: null,

  fetchPermissions: async () => {
    try {
      const response = await permissionService.getAll();
      set({ permissions: response });
    } catch (error) {}
  },

  fetchPermission: async (id: number) => {
    try {
      const response = await permissionService.getSingle(id);
      set({ permission: response });
    } catch (error) {}
  },

  addPermission: async (Permission: IPermission) => {
    try {
      const response = await permissionService.create(Permission);
      if (response) {
        set((state) => ({
          permissions: [response, ...state.permissions],
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },

  updatePermission: async (id: number, updatedPermission: IPermission) => {
    try {
      const response = await permissionService.update(id, updatedPermission);
      if (response) {
        set((state) => ({
          permissions: state.permissions.map((permission) =>
            permission.id === id ? response : permission
          ),
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },

  deletePermission: async (id: number) => {
    try {
      const response = await permissionService.delete(id);
      if (response) {
        set((state) => ({
          permissions: state.permissions.filter(
            (permission) => permission.id !== id
          ),
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },
}));
