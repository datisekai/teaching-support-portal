import { create } from "zustand";
import { metaService } from "../services/metaService";
import { IMeta } from "../types/meta";

interface IMetaState {
  meta: IMeta;
  isLoadingMetas: boolean;
  fetchMeta: () => Promise<void>;
  updateMeta: (updatedMeta: IMeta) => Promise<boolean>;
}

export const useMetaStore = create<IMetaState>((set) => ({
  meta: {} as IMeta,
  isLoadingMetas: false,

  fetchMeta: async () => {
    try {
      const response = await metaService.getSingle();
      set({ meta: response });
    } catch (error) {}
  },

  updateMeta: async (updateItem: IMeta) => {
    try {
      const response = await metaService.update(updateItem);
      if (response) {
        set({
          meta: response,
        });
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },
}));
