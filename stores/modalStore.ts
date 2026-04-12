import { Patient } from "@/app/types";
import { create } from "zustand";

export type ModalMode = "view" | "edit" | "create";

interface ModalStore {
  isOpen: boolean;
  mode: ModalMode | null;
  patient: Patient | null;
  open: (patient?: Patient | null, mode?: ModalMode) => void;
  setMode: (mode: ModalMode) => void;
  close: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  mode: null,
  patient: null,
  open: (patient = null, mode = "view") => set({ isOpen: true, mode, patient }),
  setMode: (mode) => set({ mode }),
  close: () => set({ isOpen: false, mode: null, patient: null }),
}));
