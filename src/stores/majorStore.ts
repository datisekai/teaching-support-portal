import { create } from "zustand";
import { majorService } from "../services/majorService";
import { IMajor } from "../types/major";

interface IMajorState {
  majors: IMajor[];
  majorsUnlimited: IMajor[];
  major: IMajor;
  total: number;
  isLoadingMajors: boolean;
  updateAssignTeachersMajor: (
    id: number,
    teacherCodes: object
  ) => Promise<boolean>;
  deleteTeachersMajor: (id: number, teacherCode: number) => Promise<boolean>;
  fetchMajors: (body: any) => Promise<IMajor[]>;
  fetchMajor: (id: string) => Promise<void>;
  addMajor: (Major: IMajor) => Promise<boolean>;
  updateMajor: (id: number, updatedMajor: IMajor) => Promise<boolean>;
  deleteMajor: (id: number) => Promise<boolean>;
  importMajors: (body: any) => Promise<boolean>;
}

export const useMajorStore = create<IMajorState>((set) => ({
  majors: [],
  major: {} as IMajor,
  isLoadingMajors: false,
  total: 0,
  majorsUnlimited: [],

  fetchMajors: async (body) => {
    try {
      set({ isLoadingMajors: true });
      const response = await majorService.getAll(body);
      if (body?.pagination === false) {
        set({
          majorsUnlimited: response.data,
          isLoadingMajors: false,
        });
      } else {
        set({
          majors: response.data,
          total: response.total,
          isLoadingMajors: false,
        });
      }
      return response.data;
    } catch (error) {
      set({ isLoadingMajors: false });
    }
  },
  updateAssignTeachersMajor: async (id, teacherCodes) => {
    try {
      const response = await majorService.updateAssignTeachers(
        id,
        teacherCodes
      );
      if (response) {
        set({
          major: response,
        });
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },
  deleteTeachersMajor: async (id, teacherCode) => {
    try {
      const response = await majorService.deleteTeachersMajor(id, teacherCode);
      if (response) {
        set({
          major: response,
        });
      }
      return !!response;
    } catch (error) {
      return false;
    }
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
  importMajors: async (body) => {
    try {
      const response = await majorService.importMajor(body);
      return !!response;
    } catch (error) {
      return false;
    }
  },
}));
