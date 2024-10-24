import { create } from "zustand";
import { teacherService } from "../services/teacherService";
import { IUser } from "../types/user";

interface ITeacherState {
  teachers: IUser[];
  teacher: IUser;
  total: number;
  isLoadingTeachers: boolean;
  fetchTeachers: (body: object) => Promise<void>;
  fetchTeacher: (id: string) => Promise<void>;
  addTeacher: (Teacher: IUser) => Promise<boolean>;
  updateTeacher: (id: number, updatedTeacher: IUser) => Promise<boolean>;
  deleteTeacher: (id: number) => Promise<boolean>;
}

export const useTeacherStore = create<ITeacherState>((set) => ({
  teachers: [],
  teacher: {} as IUser,
  isLoadingTeachers: false,
  total: 0,

  fetchTeachers: async (body) => {
    try {
      const response = await teacherService.getAll(body);
      set({ teachers: response.data, total: response.total });
    } catch (error) {}
  },

  fetchTeacher: async (id: string) => {
    try {
      const response = await teacherService.getSingle(id);
      set({ teacher: response });
    } catch (error) {}
  },

  addTeacher: async (data: IUser) => {
    try {
      const response = await teacherService.create(data);
      if (response) {
        set((state) => ({
          teachers: [response, ...state.teachers],
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },

  updateTeacher: async (id: number, updateItem: IUser) => {
    try {
      const response = await teacherService.update(id, updateItem);
      if (response) {
        set((state) => ({
          teachers: state.teachers.map((item) =>
            item.id === id ? response : item
          ),
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },

  deleteTeacher: async (id: number) => {
    try {
      const response = await teacherService.delete(id);
      if (response) {
        set((state) => ({
          teachers: state.teachers.filter((item) => item.id !== id),
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },
}));
