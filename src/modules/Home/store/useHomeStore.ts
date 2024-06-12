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
    totalPrice: number;
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    incrementQuantity: (id: string) => void;
    decrementQuantity: (id: string) => void;
};

export const useCartStore = create<CartState>((set) => ({
    cart: [],
    totalPrice: 0,
    addToCart: (item) =>
        set((state) => {
            const existingItem = state.cart.find(
                (cartItem) => cartItem.id === item.id
            );
            let newCart;
            if (existingItem) {
                newCart = state.cart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                newCart = [...state.cart, { ...item, quantity: 1 }];
            }
            const newTotalPrice = newCart.reduce(
                (total, cartItem) => total + cartItem.price * cartItem.quantity,
                0
            );
            return { cart: newCart, totalPrice: newTotalPrice };
        }),
    removeFromCart: (id) =>
        set((state) => {
            const newCart = state.cart.filter((item) => item.id !== id);
            const newTotalPrice = newCart.reduce(
                (total, cartItem) => total + cartItem.price * cartItem.quantity,
                0
            );
            return { cart: newCart, totalPrice: newTotalPrice };
        }),
    clearCart: () => set({ cart: [], totalPrice: 0 }),
    incrementQuantity: (id) =>
        set((state) => {
            const newCart = state.cart.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            const newTotalPrice = newCart.reduce(
                (total, cartItem) => total + cartItem.price * cartItem.quantity,
                0
            );
            return { cart: newCart, totalPrice: newTotalPrice };
        }),
    decrementQuantity: (id) =>
        set((state) => {
            const newCart = state.cart.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
                    : item
            );
            const newTotalPrice = newCart.reduce(
                (total, cartItem) => total + cartItem.price * cartItem.quantity,
                0
            );
            return { cart: newCart, totalPrice: newTotalPrice };
        }),
}));
