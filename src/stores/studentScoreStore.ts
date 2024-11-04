import { create } from "zustand";
import { studentScoreService } from "../services/studentScoreSercvice";
import { IStudentScore } from "../types/studentScore";

interface IStudentScoreState {
  studentScores: IStudentScore[];
  studentScore: any;
  isLoadingstudentScores: boolean;
  fetchstudentScore: (id: string) => Promise<void>;
  setstudentScore: (studentScores: IStudentScore[]) => void;
  updatestudentScore: (updatedstudentScore: any) => Promise<boolean>;
}

export const usestudentScoreStore = create<IStudentScoreState>((set) => ({
  studentScores: [],
  studentScore: {} as any,
  isLoadingstudentScores: false,

  setstudentScore: (studentScores: IStudentScore[]) => {
    set({ studentScores });
  },

  fetchstudentScore: async (id: string) => {
    try {
      const response = await studentScoreService.getSingle(id);
      set({ studentScore: response });
    } catch (error) {}
  },

  updatestudentScore: async (updateItem: IStudentScore) => {
    try {
      const response = await studentScoreService.update(updateItem);
      if (response) {
        set((state) => ({
          studentScore: (state.studentScore.data.columns = response),
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },
}));
