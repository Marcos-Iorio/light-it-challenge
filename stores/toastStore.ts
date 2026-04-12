import { IToast } from "@/app/types";
import { uuid } from "zod";
import { create } from "zustand";

interface ToastStore {
  toasts: IToast[];
  addToast: (toast: IToast) => void;
  removeToast: (id: IToast["id"]) => void;
}

const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) =>
    set((state) => ({
      toasts: [
        ...state.toasts,
        { id: crypto.randomUUID(), type: toast.type, message: toast.message },
      ],
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id != id),
    })),
}));

export default useToastStore;
