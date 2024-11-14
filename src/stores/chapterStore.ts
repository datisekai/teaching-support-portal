import { create } from "zustand";
import { chapterService } from "../services/chapterService";
import { IChapter } from "../types/chapter";

interface IChapterState {
  chapters: IChapter[];
  chapter: IChapter;
  total: number;
  ChapterHistorys: any;

  isLoadingChapters: boolean;
  fetchChapters: (body: object) => Promise<void>;

  addChapter: (Chapter: IChapter) => Promise<boolean>;

  deleteChapter: (id: number) => Promise<boolean>;
}

export const useChapterStore = create<IChapterState>((set) => ({
  chapters: [],
  chapter: {} as IChapter,
  isLoadingChapters: false,
  total: 0,
  ChapterHistorys: [],

  fetchChapters: async (body) => {
    try {
      set({ isLoadingChapters: true });
      const response = await chapterService.getAll(body);
      set({
        chapters: response.data,
        total: response.total,
        isLoadingChapters: false,
      });
    } catch (error) {
      set({ isLoadingChapters: false });
    }
  },

  addChapter: async (Chapter: IChapter) => {
    try {
      const response = await chapterService.create(Chapter);
      if (response) {
        set((state) => ({
          chapters: [response, ...state.chapters],
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },

  deleteChapter: async (id: number) => {
    try {
      const response = await chapterService.delete(id);
      if (response) {
        set((state) => ({
          chapters: state.chapters.filter((item) => item.id !== id),
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },
}));
