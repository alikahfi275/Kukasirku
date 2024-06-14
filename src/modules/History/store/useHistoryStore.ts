import { create } from 'zustand';

interface HistoryState {
    checkouts: any[];
    searchQueryHistory: string;

    setSearchQueryHistory: (query: string) => void;
    setCheckouts: (checkouts: any[]) => void;
}

export const useHistoryStore = create<HistoryState>((set) => ({
    checkouts: [],
    searchQueryHistory: '',

    setSearchQueryHistory: (query: string) => set({ searchQueryHistory: query }),
    setCheckouts: (checkouts: any[]) => set({ checkouts }),
}))