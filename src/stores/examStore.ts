import { create } from "zustand";
import { examService } from "../services/examService";
import { IExam } from "../types/exam";

interface IExamState {
  exams: IExam[];
  exam: IExam;
  total: number;
  examHistorys: any;

  isLoadingExams: boolean;
  fetchExams: (body: object) => Promise<void>;
  fetchExam: (id: string) => Promise<void>;
  addExam: (Exam: IExam) => Promise<boolean>;
  updateExam: (id: number, updatedExam: IExam) => Promise<boolean>;
  deleteExam: (id: number) => Promise<boolean>;
  getHistory: (id: string) => Promise<void>;
}

export const useExamStore = create<IExamState>((set) => ({
  exams: [],
  exam: {} as IExam,
  isLoadingExams: false,
  total: 0,
  examHistorys: [],

  fetchExams: async (body) => {
    try {
      const response = await examService.getAll(body);
      set({ exams: response.data, total: response.total });
    } catch (error) {}
  },

  fetchExam: async (id: string) => {
    try {
      const response = await examService.getSingle(id);
      set({ exam: response });
    } catch (error) {}
  },

  addExam: async (Exam: IExam) => {
    try {
      const response = await examService.create(Exam);
      if (response) {
        set((state) => ({
          exams: [response, ...state.exams],
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },

  updateExam: async (id: number, updatedExam: IExam) => {
    try {
      const response = await examService.update(id, updatedExam);
      if (response) {
        set((state) => ({
          exams: state.exams.map((item) => (item.id === id ? response : item)),
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },

  deleteExam: async (id: number) => {
    try {
      const response = await examService.delete(id);
      if (response) {
        set((state) => ({
          exams: state.exams.filter((item) => item.id !== id),
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },
  getHistory: async (id: string) => {
    try {
      const response = await examService.getHistory(id);
      set({ examHistorys: response.data });
    } catch (error) {}
  },
}));
