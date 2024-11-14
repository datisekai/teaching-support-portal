import { create } from "zustand";
import { difficultyService } from "../services/difficultyService";
import { IDifficulty } from "../types/difficulty";

interface IDifficultyState {
  difficultys: IDifficulty[];
  difficulty: IDifficulty;
  total: number;
  DifficultyHistorys: any;

  isLoadingDifficultys: boolean;
  fetchDifficultys: (body: object) => Promise<void>;

  addDifficulty: (Difficulty: IDifficulty) => Promise<boolean>;

  deleteDifficulty: (id: number) => Promise<boolean>;
}

export const useDifficultyStore = create<IDifficultyState>((set) => ({
  difficultys: [],
  difficulty: {} as IDifficulty,
  isLoadingDifficultys: false,
  total: 0,
  DifficultyHistorys: [],

  fetchDifficultys: async (body) => {
    try {
      set({ isLoadingDifficultys: true });
      const response = await difficultyService.getAll(body);
      set({
        difficultys: response.data,
        total: response.total,
        isLoadingDifficultys: false,
      });
    } catch (error) {
        set({isLoadingDifficultys:false})
    }
  },

  addDifficulty: async (Difficulty: IDifficulty) => {
    try {
      const response = await difficultyService.create(Difficulty);
      if (response) {
        set((state) => ({
          difficultys: [response, ...state.difficultys],
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },

  deleteDifficulty: async (id: number) => {
    try {
      const response = await difficultyService.delete(id);
      if (response) {
        set((state) => ({
          difficultys: state.difficultys.filter((item) => item.id !== id),
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },
}));
