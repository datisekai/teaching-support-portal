import { create } from "zustand";
import { classService } from "../services/classService";
import { IClass } from "../types/class";
import { User } from "../types/attendance";

interface IClassState {
  classes: IClass[];
  _class: IClass;
  students: User[];
  total: number;
  totalStudent: number;
  isLoadingClasss: boolean;
  fetchClasses: (body: object) => Promise<void>;
  fetchClass: (id: string) => Promise<void>;
  addClass: (Class: IClass) => Promise<boolean>;
  updateAssignTeachersClass: (
    id: number,
    teacherCodes: object
  ) => Promise<boolean>;
  updateClass: (id: number, updatedClass: IClass) => Promise<boolean>;
  deleteClass: (id: number) => Promise<boolean>;
  getStudentClass: (id: string) => Promise<void>;
}

export const useClassStore = create<IClassState>((set) => ({
  classes: [],
  students: [],
  _class: {} as IClass,
  isLoadingClasss: false,
  total: 0,
  totalStudent: 0,

  fetchClasses: async (body) => {
    try {
      const response = await classService.getAll(body);
      set({ classes: response.data, total: response.total });
    } catch (error) {}
  },

  fetchClass: async (id: string) => {
    try {
      const response = await classService.getSingle(id);
      set({ _class: response });
    } catch (error) {}
  },

  addClass: async (Class: IClass) => {
    try {
      const response = await classService.create(Class);
      if (response) {
        set((state) => ({
          classes: [response, ...state.classes],
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },

  updateClass: async (id: number, updatedClass: IClass) => {
    try {
      const response = await classService.update(id, updatedClass);
      if (response) {
        set((state) => ({
          classes: state.classes.map((item) =>
            item.id === id ? response : item
          ),
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },

  updateAssignTeachersClass: async (id: number, teacherCodes: object) => {
    try {
      const response = await classService.updateAssignTeachers(
        id,
        teacherCodes
      );
      if (response) {
        set((state) => ({
          classes: state.classes.map((item) =>
            item.id === id ? response : item
          ),
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },

  deleteClass: async (id: number) => {
    try {
      const response = await classService.delete(id);
      if (response) {
        set((state) => ({
          classes: state.classes.filter((item) => item.id !== id),
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },
  getStudentClass: async (id: string) => {
    try {
      const response = await classService.getStudentClass(id);
      set({ students: response.data, totalStudent: response.total });
    } catch (error) {}
  },
}));
