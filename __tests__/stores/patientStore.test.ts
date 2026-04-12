import { describe, it, expect, beforeEach } from "vitest";
import { usePatientStore } from "@/stores/patientStore";
import { Patient } from "@/app/types";

const makePatient = (overrides: Partial<Patient> = {}): Patient => ({
  id: "1",
  name: "John Doe",
  avatar: "https://example.com/avatar.png",
  description: "A patient",
  website: "https://example.com",
  createdAt: new Date("2024-01-01"),
  ...overrides,
});

beforeEach(() => {
  usePatientStore.setState({ patients: [] });
});

describe("patientStore", () => {
  describe("initial state", () => {
    it("starts with an empty patients array", () => {
      expect(usePatientStore.getState().patients).toEqual([]);
    });
  });

  describe("setPatients", () => {
    it("replaces the entire patients list", () => {
      const patients = [makePatient({ id: "1" }), makePatient({ id: "2" })];
      usePatientStore.getState().setPatients(patients);
      expect(usePatientStore.getState().patients).toEqual(patients);
    });

    it("replaces existing patients with new list", () => {
      usePatientStore.getState().setPatients([makePatient({ id: "old" })]);
      const newList = [makePatient({ id: "new1" }), makePatient({ id: "new2" })];
      usePatientStore.getState().setPatients(newList);
      expect(usePatientStore.getState().patients).toEqual(newList);
    });

    it("clears patients when given an empty array", () => {
      usePatientStore.getState().setPatients([makePatient()]);
      usePatientStore.getState().setPatients([]);
      expect(usePatientStore.getState().patients).toEqual([]);
    });
  });

  describe("addPatient", () => {
    it("appends a patient to the empty list", () => {
      const patient = makePatient();
      usePatientStore.getState().addPatient(patient);
      expect(usePatientStore.getState().patients).toEqual([patient]);
    });

    it("appends without removing existing patients", () => {
      const first = makePatient({ id: "1" });
      const second = makePatient({ id: "2" });
      usePatientStore.getState().addPatient(first);
      usePatientStore.getState().addPatient(second);
      expect(usePatientStore.getState().patients).toHaveLength(2);
      expect(usePatientStore.getState().patients[1]).toEqual(second);
    });
  });

  describe("updatePatient", () => {
    it("updates the matching patient by id", () => {
      const original = makePatient({ id: "1", name: "Original" });
      usePatientStore.getState().setPatients([original]);

      const updated = { ...original, name: "Updated" };
      usePatientStore.getState().updatePatient(updated);

      expect(usePatientStore.getState().patients[0].name).toBe("Updated");
    });

    it("does not modify other patients", () => {
      const a = makePatient({ id: "1", name: "Alice" });
      const b = makePatient({ id: "2", name: "Bob" });
      usePatientStore.getState().setPatients([a, b]);

      usePatientStore.getState().updatePatient({ ...a, name: "Alice Updated" });

      expect(usePatientStore.getState().patients[1].name).toBe("Bob");
    });

    it("is a no-op when no patient matches the id", () => {
      const patient = makePatient({ id: "1" });
      usePatientStore.getState().setPatients([patient]);

      usePatientStore.getState().updatePatient(makePatient({ id: "999", name: "Ghost" }));

      expect(usePatientStore.getState().patients).toHaveLength(1);
      expect(usePatientStore.getState().patients[0].name).toBe("John Doe");
    });
  });
});
