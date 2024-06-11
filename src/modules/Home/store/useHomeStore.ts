import { create } from 'zustand';
import { Product } from './type';

interface HomeState {
    products: Product[];
    productById: Product[];
    searchQuery: string;


    setSearchQuery: (query: string) => void;
    setProducts: (products: Product[]) => void;
    setProductById: (productById: Product[]) => void;
}

export const useHomeStore = create<HomeState>((set, get) => ({
    products: [],
    productById: [],
    searchQuery: '',

    setSearchQuery: (query: string) => set({ searchQuery: query }),
    setProducts: (products: Product[]) => set({ products }),
    setProductById: (productById: Product[]) => set({ productById }),
}));


type CartItem = {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    quantity: number;
};

type CartState = {
    cart: CartItem[];
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
};

export const useCartStore = create<CartState>((set) => ({
    cart: [],
    addToCart: (item) => set((state) => {
        const existingItem = state.cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            return {
                cart: state.cart.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                )
            };
        }
        return { cart: [...state.cart, { ...item, quantity: 1 }] };
    }),
    removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== id)
    })),
    clearCart: () => set({ cart: [] })
}));