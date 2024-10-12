import { create } from "zustand";
import { facultyService } from "../services/faculty";
import { IFaculty } from "../types/faculty";

interface IFacultyState {
  facultys: IFaculty[];
  faculty: IFaculty | null;
  total: number;
  isLoadingFacultys: boolean;
  fetchFacultys: (body: object) => Promise<void>;
  fetchFaculty: (id: string) => Promise<void>;
  addFaculty: (Faculty: IFaculty) => Promise<boolean>;
  updateFaculty: (id: number, updatedFaculty: IFaculty) => Promise<boolean>;
  deleteFaculty: (id: number) => Promise<boolean>;
}

export const useFacultyStore = create<IFacultyState>((set) => ({
  facultys: [],
  faculty: null,
  isLoadingFacultys: false,
  total: 0,

  fetchFacultys: async (body) => {
    try {
      const response = await facultyService.getAll(body);
      set({ facultys: response.data, total: response.total });
    } catch (error) {}
  },

  fetchFaculty: async (id: string) => {
    try {
      const response = await facultyService.getSingle(id);
      set({ faculty: response });
    } catch (error) {}
  },

  addFaculty: async (Faculty: IFaculty) => {
    try {
      const response = await facultyService.create(Faculty);
      if (response) {
        set((state) => ({
          facultys: [response, ...state.facultys],
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },

  updateFaculty: async (id: number, updatedFaculty: IFaculty) => {
    try {
      const response = await facultyService.update(id, updatedFaculty);
      if (response) {
        set((state) => ({
          facultys: state.facultys.map((faculty) =>
            faculty.id === id ? response : faculty
          ),
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },

  deleteFaculty: async (id: number) => {
    try {
      const response = await facultyService.delete(id);
      if (response) {
        set((state) => ({
          facultys: state.facultys.filter((faculty) => faculty.id !== id),
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },
}));
