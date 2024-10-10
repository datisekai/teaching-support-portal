import { create } from "zustand";
import { permissionService } from "../services/permission";
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
    const response = await permissionService.getAll();
    console.log(response);
    set({ permissions: response });
  },
  fetchPermission: async (id: number) => {
    const response = await permissionService.getSingle(id);
    console.log(response);
    set({ permissions: response });
  },

  addPermission: async (Permission: IPermission) => {
    const response = await permissionService.create(Permission);
    if (response) {
      set((state) => ({
        permissions: [response, ...state.permissions],
      }));
    }
    return !!response;
  },

  updatePermission: async (id: number, updatedPermission: IPermission) => {
    const response = await permissionService.update(id, updatedPermission);
    if (response) {
      set((state) => ({
        permissions: state.permissions.map((permission) =>
          permission.id === id ? response : permission
        ),
      }));
    }
    return !!response;
  },

  deletePermission: async (id: number) => {
    const response = await permissionService.delete(id);
    if (response) {
      set((state) => ({
        permissions: state.permissions.filter(
          (permission) => permission.id !== id
        ),
      }));
    }
    return !!response;
  },
}));
