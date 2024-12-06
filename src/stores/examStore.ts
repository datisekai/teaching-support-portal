import { create } from "zustand";
import { examService } from "../services/examService";
import { IExam } from "../types/exam";
import { IQuestion } from "../types/question";
import { IExamHistory } from "../types/examHistory";

type History = {
  takeOrder: number[];
  submissions: any;
  showResult: boolean;
};
interface IExamState {
  exams: IExam[];
  exam: IExam;
  total: number;
  examHistorys: any;
  history: History;
  isLoadingExams: boolean;
  updatedExam: any;
  fetchExams: (body: object) => Promise<void>;
  fetchExam: (id: string) => Promise<void>;
  addExam: (Exam: IExam) => Promise<boolean>;
  updateExam: (id: number, updatedExam: IExam) => Promise<boolean>;
  deleteExam: (id: number) => Promise<boolean>;
  getHistory: (id: string) => Promise<void>;
  getExamHistory: (examId: number, userId: number) => Promise<void>;
  getTakeOrder: (id: string) => Promise<void>;
  updateSubmission: (id: number, body: object) => Promise<boolean>;
  setUpdatedExam: (key: string, value: any) => void;
  linkScore: (id: number) => Promise<void>;
}

export const useExamStore = create<IExamState>((set) => ({
  exams: [],
  exam: {} as IExam,
  isLoadingExams: false,
  total: 0,
  history: {} as History,
  examHistorys: [],
  filterQuestions: [],
  updatedExam: {},
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
      set({ examHistorys: response });
    } catch (error) {}
  },
  getExamHistory: async (id, userId) => {
    try {
      const resp = await examService.getExamHistory(id, userId);
      const submissions: any = {};

      resp.data.submissions.forEach((s: any) => {
        submissions[s.examQuestion.id] = s;
      });
      set((state) => ({
        ...state,
        history: {
          ...state.history,
          submissions,
          showResult: resp.data.showResult,
        },
      }));
    } catch (error) {
      console.log(error);
    }
  },
  getTakeOrder: async (id) => {
    try {
      const resp = await examService.getTakeOrder(id);

      set((state) => ({
        ...state,
        history: {
          ...state.history,
          takeOrder: resp.data,
        },
      }));
    } catch (error) {
      console.log(error);
    }
  },
  updateSubmission: async (id, body) => {
    try {
      const resp = await examService.updateSubmission(id, body);
      return !!resp;
    } catch (error) {
      return false;
    }
  },
  setUpdatedExam: (key, value) => {
    set((state) => ({
      ...state,
      updatedExam: {
        ...state.updatedExam,
        [key]: value,
      },
    }));
  },
  linkScore: async (id) => {
    try {
      await examService.link(id);
    } catch (error) {}
  },
}));
