import { create } from "zustand";
import { majorService } from "../services/majorService";
import { IMajor } from "../types/major";

interface IMajorState {
  majors: IMajor[];
  major: IMajor | null;
  total: number;
  isLoadingMajors: boolean;
  fetchMajors: (body: object) => Promise<void>;
  fetchMajor: (id: string) => Promise<void>;
  addMajor: (Major: IMajor) => Promise<boolean>;
  updateMajor: (id: number, updatedMajor: IMajor) => Promise<boolean>;
  deleteMajor: (id: number) => Promise<boolean>;
}

export const useMajorStore = create<IMajorState>((set) => ({
  majors: [],
  major: null,
  isLoadingMajors: false,
  total: 0,

  fetchMajors: async (body) => {
    try {
      const response = await majorService.getAll(body);
      set({ majors: response.data, total: response.total });
    } catch (error) {}
  },

  fetchMajor: async (id: string) => {
    try {
      const response = await majorService.getSingle(id);
      set({ major: response });
    } catch (error) {}
  },

  addMajor: async (Major: IMajor) => {
    try {
      const response = await majorService.create(Major);
      if (response) {
        set((state) => ({
          majors: [response, ...state.majors],
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },

  updateMajor: async (id: number, updatedMajor: IMajor) => {
    try {
      const response = await majorService.update(id, updatedMajor);
      if (response) {
        set((state) => ({
          majors: state.majors.map((major) =>
            major.id === id ? response : major
          ),
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },

  deleteMajor: async (id: number) => {
    try {
      const response = await majorService.delete(id);
      if (response) {
        set((state) => ({
          majors: state.majors.filter((major) => major.id !== id),
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },
}));
