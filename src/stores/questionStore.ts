import { create } from "zustand";
import { questionService } from "../services/questionService";

interface IQuestionState {
  questions: any[];
  question: any | null;
  total: number;
  isLoadingQuestions: boolean;
  fetchQuestions: (body: object) => Promise<void>;
  fetchQuestion: (id: string) => Promise<void>;
  addQuestion: (question: any) => Promise<boolean>;
  updateQuestion: (id: number, updatedQuestion: any) => Promise<boolean>;
  deleteQuestion: (id: number) => Promise<boolean>;
}

export const useQuestionStore = create<IQuestionState>((set) => ({
  questions: [],
  question: null,
  isLoadingQuestions: false,
  total: 0,

  fetchQuestions: async (body) => {
    try {
      const response = await questionService.getAll(body);
      set({ questions: response.data, total: response.total });
    } catch (error) {}
  },

  fetchQuestion: async (id: string) => {
    try {
      const response = await questionService.getSingle(id);
      set({ question: response });
    } catch (error) {}
  },

  addQuestion: async (Question: any) => {
    try {
      const response = await questionService.create(Question);
      if (response) {
        set((state) => ({
          questions: [response, ...state.questions],
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },

  updateQuestion: async (id: number, updatedQuestion: any) => {
    try {
      const response = await questionService.update(id, updatedQuestion);
      if (response) {
        set((state) => ({
          questions: state.questions.map((question) =>
            question.id === id ? response : question
          ),
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },

  deleteQuestion: async (id: number) => {
    try {
      const response = await questionService.delete(id);
      if (response) {
        set((state) => ({
          questions: state.questions.filter((question) => question.id !== id),
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },
}));
