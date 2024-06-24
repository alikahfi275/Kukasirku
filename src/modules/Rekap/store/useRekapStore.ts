import { create } from 'zustand';

interface RekapState {
    selectedMonth: number;
    productCounts: Record<string, { count: number; totalPrice: number }>;
    totalProducts: number;
    totalPrice: number;
    loading: boolean;


    setSelectedMonth: (selectedMonth: number) => void;
    setProductCounts: (productCounts: Record<string, { count: number; totalPrice: number }>) => void;
    setTotalProducts: (totalProducts: number) => void;
    setTotalPrice: (totalPrice: number) => void;
    setLoading: (loading: boolean) => void;
}

export const useRekapStore = create<RekapState>((set) => ({
    selectedMonth: new Date().getMonth(),
    productCounts: {},
    totalProducts: 0,
    totalPrice: 0,
    loading: false,

    setSelectedMonth: (selectedMonth: number) => set({ selectedMonth }),
    setProductCounts: (productCounts: Record<string, { count: number; totalPrice: number }>) => set({ productCounts }),
    setTotalProducts: (totalProducts: number) => set({ totalProducts }),
    setTotalPrice: (totalPrice: number) => set({ totalPrice }),
    setLoading: (loading: boolean) => set({ loading }),
}))