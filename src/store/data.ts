import { create } from 'zustand'

interface DataState {
  markdown: string
  setMarkdown: (value: string) => void
}

export const useDataStore = create<DataState>((set) => ({
  markdown: '',
  setMarkdown: (value) => set({ markdown: value }),
}))
