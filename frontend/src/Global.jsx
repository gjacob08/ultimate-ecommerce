import create from "zustand"
import { devtools, persist } from 'zustand/middleware'

let global = (set) => ({
    cartItems: [],
    cartOpen: false,
    toggleCart: () => set((state) => ({ cartOpen: !state.cartOpen })),
    addItem: (item) => set((state) => ({ cartItems: [...state.cartItems, item] })),
    removeItem: (item) => set((state) => ({ cartItems: state.cartItems.filter((cartItem) => cartItem._id !== item._id)} ))
})

global = devtools(global)
global = persist(global, { name: 'global_states' })

export const useGlobal = create(global)