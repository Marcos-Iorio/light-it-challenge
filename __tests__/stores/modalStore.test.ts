import { describe, it, expect, beforeEach } from "vitest";
import { useModalStore } from "@/stores/modalStore";
import { Patient } from "@/app/types";

const makePatient = (overrides: Partial<Patient> = {}): Patient => ({
  id: "1",
  name: "John Doe",
  avatar: "",
  description: "A patient",
  website: "",
  createdAt: new Date("2024-01-01"),
  ...overrides,
});

beforeEach(() => {
  useModalStore.setState({ isOpen: false, mode: null, patient: null });
});

describe("modalStore", () => {
  describe("initial state", () => {
    it("is closed with no mode and no patient", () => {
      const { isOpen, mode, patient } = useModalStore.getState();
      expect(isOpen).toBe(false);
      expect(mode).toBeNull();
      expect(patient).toBeNull();
    });
  });

  describe("open", () => {
    it("opens in view mode with a patient by default", () => {
      const patient = makePatient();
      useModalStore.getState().open(patient);
      const state = useModalStore.getState();
      expect(state.isOpen).toBe(true);
      expect(state.mode).toBe("view");
      expect(state.patient).toEqual(patient);
    });

    it("opens in a specified mode", () => {
      const patient = makePatient();
      useModalStore.getState().open(patient, "edit");
      expect(useModalStore.getState().mode).toBe("edit");
    });

    it("opens in create mode with no patient", () => {
      useModalStore.getState().open(null, "create");
      const state = useModalStore.getState();
      expect(state.isOpen).toBe(true);
      expect(state.mode).toBe("create");
      expect(state.patient).toBeNull();
    });

    it("defaults patient to null when called with no arguments", () => {
      useModalStore.getState().open();
      const state = useModalStore.getState();
      expect(state.patient).toBeNull();
      expect(state.mode).toBe("view");
    });
  });

  describe("setMode", () => {
    it("changes the mode without closing the modal", () => {
      const patient = makePatient();
      useModalStore.getState().open(patient, "view");
      useModalStore.getState().setMode("edit");
      const state = useModalStore.getState();
      expect(state.mode).toBe("edit");
      expect(state.isOpen).toBe(true);
    });

    it("can switch from edit back to view", () => {
      useModalStore.getState().open(makePatient(), "edit");
      useModalStore.getState().setMode("view");
      expect(useModalStore.getState().mode).toBe("view");
    });
  });

  describe("close", () => {
    it("resets all state to closed defaults", () => {
      useModalStore.getState().open(makePatient(), "edit");
      useModalStore.getState().close();
      const { isOpen, mode, patient } = useModalStore.getState();
      expect(isOpen).toBe(false);
      expect(mode).toBeNull();
      expect(patient).toBeNull();
    });
  });
});
