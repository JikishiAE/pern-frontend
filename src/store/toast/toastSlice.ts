import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ToastType } from "../../utils"

interface ToastState {
  toasts: ToastType[]
}

const initialState: ToastState = {
  toasts: [],
}

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Omit<ToastType, "id">>) => {
      const id = Math.random().toString(36).substring(2, 9)
      state.toasts.push({ id, ...action.payload })
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload)
    },
  },
})

export const { addToast, removeToast } = toastSlice.actions
