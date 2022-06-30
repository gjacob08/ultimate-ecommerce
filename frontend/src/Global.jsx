import create from "zustand"
import { devtools, persist } from 'zustand/middleware'

let global = (set) => ({
    cartItems: [],
    cartOpen: false,
    importProductModalOpen: false,
    updateProductModalOpen: false,
    paymentSuccessModalOpen: false,
    productUpdateId: "",
    toggleCart: () => set((state) => ({ cartOpen: !state.cartOpen })),
    toggleImportProductModal: () => set((state) => ({ importProductModalOpen: !state.importProductModalOpen })),
    toggleUpdateProductModal: () => set((state) => ({ updateProductModalOpen: !state.updateProductModalOpen })),
    togglePaymentSuccessModal: (status) => set((state) => ({ paymentSuccessModalOpen: state.paymentSuccessModalOpen = status })),
    setProductUpdateId: (id) => set((state) => ({ productUpdateId: state.productUpdateId = id })),
    addItem: (item) => set((state) => ({ cartItems: [...state.cartItems, item] })),
    removeItem: (item) => set((state) => ({ cartItems: state.cartItems.filter((cartItem) => cartItem._id !== item._id) })),
    emptyCart: () => set((state) => ({ cartItems: state.cartItems = [] }))
})

global = devtools(global)
global = persist(global, { name: 'global_states' })

export const useGlobal = create(global)