import { describe, it, expect } from "vitest";
import { patientFormSchema } from "@/app/components/Patient/component/PatientForm/patient-form.schema";

const validData = {
  name: "Jane Doe",
  description: "A healthy patient",
  avatar: "",
  website: "",
};

describe("patientFormSchema", () => {
  describe("valid data", () => {
    it("accepts a complete valid payload", () => {
      expect(patientFormSchema.safeParse(validData).success).toBe(true);
    });

    it("accepts optional fields as undefined", () => {
      const result = patientFormSchema.safeParse({
        name: "Jane",
        description: "Desc",
      });
      expect(result.success).toBe(true);
    });
  });

  describe("name", () => {
    it("fails when name is empty", () => {
      const result = patientFormSchema.safeParse({ ...validData, name: "" });
      expect(result.success).toBe(false);
      if (!result.success) {
        const nameError = result.error.issues.find((i) => i.path[0] === "name");
        expect(nameError).toBeDefined();
      }
    });
  });

  describe("description", () => {
    it("fails when description is empty", () => {
      const result = patientFormSchema.safeParse({ ...validData, description: "" });
      expect(result.success).toBe(false);
      if (!result.success) {
        const err = result.error.issues.find((i) => i.path[0] === "description");
        expect(err).toBeDefined();
      }
    });
  });

  describe("avatar", () => {
    it("accepts an empty string", () => {
      expect(patientFormSchema.safeParse({ ...validData, avatar: "" }).success).toBe(true);
    });

    it("accepts a valid URL", () => {
      const result = patientFormSchema.safeParse({
        ...validData,
        avatar: "https://example.com/pic.jpg",
      });
      expect(result.success).toBe(true);
    });

    it("rejects an invalid URL", () => {
      const result = patientFormSchema.safeParse({
        ...validData,
        avatar: "not-a-url",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("website", () => {
    it("accepts an empty string", () => {
      expect(patientFormSchema.safeParse({ ...validData, website: "" }).success).toBe(true);
    });

    it("accepts a valid URL", () => {
      const result = patientFormSchema.safeParse({
        ...validData,
        website: "https://clinic.com",
      });
      expect(result.success).toBe(true);
    });

    it("rejects an invalid URL", () => {
      const result = patientFormSchema.safeParse({
        ...validData,
        website: "ftp//bad",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("password", () => {
    it("accepts an empty password with empty confirmation", () => {
      const result = patientFormSchema.safeParse({
        ...validData,
        password: "",
        password_confirmation: "",
      });
      expect(result.success).toBe(true);
    });

    it("accepts a password with 8+ characters", () => {
      const result = patientFormSchema.safeParse({
        ...validData,
        password: "securepass",
        password_confirmation: "securepass",
      });
      expect(result.success).toBe(true);
    });

    it("rejects a password shorter than 8 characters", () => {
      const result = patientFormSchema.safeParse({
        ...validData,
        password: "short",
        password_confirmation: "short",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("password confirmation", () => {
    it("passes when passwords match", () => {
      const result = patientFormSchema.safeParse({
        ...validData,
        password: "password123",
        password_confirmation: "password123",
      });
      expect(result.success).toBe(true);
    });

    it("fails when passwords do not match", () => {
      const result = patientFormSchema.safeParse({
        ...validData,
        password: "password123",
        password_confirmation: "different",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        const err = result.error.issues.find(
          (i) => i.path[0] === "password_confirmation"
        );
        expect(err?.message).toBe("Passwords do not match");
      }
    });

    it("passes when both are empty strings (no password set)", () => {
      const result = patientFormSchema.safeParse({
        ...validData,
        password: "",
        password_confirmation: "",
      });
      expect(result.success).toBe(true);
    });
  });
});
