import { create } from 'zustand'

export const useCommonStore = create((set) => ({
  isLoadingApi: false,
}))
