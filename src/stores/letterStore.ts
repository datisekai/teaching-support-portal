import { create } from "zustand";
import { letterService } from "../services/letterService";
import { ILetter } from "../types/letter";

interface ILetterState {
  letters: ILetter[];
  letter: ILetter;
  total: number;
  isLoadingLetters: boolean;
  fetchLetters: (body: object) => Promise<void>;
  fetchLetter: (id: string) => Promise<void>;
  addLetter: (Letter: ILetter) => Promise<boolean>;
  updateLetter: (id: number, updatedLetter: ILetter) => Promise<boolean>;
  updateStatus: (id: number, body: object) => Promise<boolean>;
}

export const useLetterStore = create<ILetterState>((set) => ({
  letters: [],
  letter: {} as ILetter,
  isLoadingLetters: false,
  total: 0,

  fetchLetters: async (body) => {
    try {
      const response = await letterService.getAll(body);
      set({ letters: response.data, total: response.total });
    } catch (error) {}
  },

  fetchLetter: async (id: string) => {
    try {
      const response = await letterService.getSingle(id);
      set({ letter: response });
    } catch (error) {}
  },

  addLetter: async (data: ILetter) => {
    try {
      const response = await letterService.create(data);
      if (response) {
        set((state) => ({
          letters: [response, ...state.letters],
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },

  updateLetter: async (id: number, updateItem: ILetter) => {
    try {
      const response = await letterService.update(id, updateItem);
      if (response) {
        set((state) => ({
          letters: state.letters.map((item) =>
            item.id === id ? response : item
          ),
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },
  updateStatus: async (id: number, body: object) => {
    try {
      const response = await letterService.updateStatus(id, body);
      if (response) {
        set((state) => ({
          letters: state.letters.map((item) =>
            item.id === id ? { ...item, ...response } : item
          ),
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },
}));
