import { create } from "zustand";
import { languageService } from "../services/languageService";
import { ILanguage } from "../types/language";

interface IFacultyState {
  languages: ILanguage[];
  fetchLanguages: () => Promise<void>;
}

export const useLanguageStore = create<IFacultyState>((set) => ({
  languages: [],
  fetchLanguages: async () => {
    try {
      const response = await languageService.getAll();
      set({ languages: response.data });
    } catch (error) {}
  },
}));
