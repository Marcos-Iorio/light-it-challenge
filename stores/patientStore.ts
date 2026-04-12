import { create } from "zustand";
import { Patient } from "@/app/types";

interface PatientStore {
  patients: Patient[];
  setPatients: (patients: Patient[]) => void;
  updatePatient: (patient: Patient) => void;
  addPatient: (patient: Patient) => void;
}

export const usePatientStore = create<PatientStore>((set) => ({
  patients: [],
  setPatients: (patients) => set({ patients }),
  updatePatient: (updatedPatient) =>
    set((state) => ({
      patients: state.patients.map((p) =>
        p.id === updatedPatient.id ? updatedPatient : p
      ),
    })),
  addPatient: (patient) =>
    set((state) => ({
      patients: [...state.patients, patient],
    })),
}));
