import { create } from "zustand";
import { scoreColumnService } from "../services/scoreColumnService";
import { IScoreColumn } from "../types/scoreColumn";

interface IScoreColumnState {
  scoreColumns: IScoreColumn[];
  scoreColumn: any;
  isLoadingScoreColumns: boolean;
  fetchScoreColumn: (id: string) => Promise<void>;
  setScoreColumn: (scoreColumns: IScoreColumn[]) => void;
  updateScoreColumn: (updatedScoreColumn: any) => Promise<boolean>;
  getSingleClass: (id: string) => Promise<void>;
  createMultiple: (body: Record<string, any>) => Promise<boolean>;
  deleteScoreColumn: (id: string) => Promise<boolean>;
}

export const useScoreColumnStore = create<IScoreColumnState>((set) => ({
  scoreColumns: [],
  scoreColumn: {} as any,
  isLoadingScoreColumns: false,

  setScoreColumn: (scoreColumns: IScoreColumn[]) => {
    set({ scoreColumns });
  },

  fetchScoreColumn: async (id: string) => {
    try {
      const response = await scoreColumnService.getSingle(id);
      set({ scoreColumn: response });
    } catch (error) {}
  },

  updateScoreColumn: async (updateItem: IScoreColumn) => {
    try {
      const response = await scoreColumnService.update(updateItem);
      if (response) {
        set((state) => ({
          scoreColumn: (state.scoreColumn.data.columns = response),
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },
  createMultiple: async (body: Record<string, any>) => {
    try {
      const response = await scoreColumnService.createMultiple(body);
      return !!response;
    } catch (error) {
      return false;
    }
  },
  getSingleClass: async (id: string) => {
    try {
      const response = await scoreColumnService.getSingleClass(id);
      set({ scoreColumn: response });
    } catch (error) {}
  },
  deleteScoreColumn: async (id: string) => {
    try {
      const response = await scoreColumnService.delete(id);
      return !!response;
    } catch (error) {
      return false;
    }
  },
}));
