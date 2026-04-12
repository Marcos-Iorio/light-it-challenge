import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PatientForm from "@/app/components/Patient/component/PatientForm/patient-form";
import { Patient } from "@/app/types";

const mockClose = vi.fn();
const mockUpdatePatient = vi.fn();
const mockAddPatient = vi.fn();
const mockAddToast = vi.fn();

vi.mock("@/stores/modalStore", () => ({
  useModalStore: () => ({ close: mockClose }),
}));

vi.mock("@/stores/patientStore", () => ({
  usePatientStore: () => ({
    updatePatient: mockUpdatePatient,
    addPatient: mockAddPatient,
  }),
}));

vi.mock("@/stores/toastStore", () => ({
  default: () => ({ addToast: mockAddToast }),
}));

const existingPatient: Patient = {
  id: "p1",
  name: "Jane Doe",
  avatar: "https://example.com/avatar.jpg",
  description: "Experienced patient",
  website: "https://janedoe.com",
  createdAt: new Date("2023-06-01"),
};

beforeEach(() => {
  mockClose.mockClear();
  mockUpdatePatient.mockClear();
  mockAddPatient.mockClear();
  mockAddToast.mockClear();
});

describe("PatientForm", () => {
  describe("create mode (patient=null)", () => {
    it("renders 'New patient' as the heading", () => {
      render(<PatientForm patient={null} />);
      expect(screen.getByText("New patient")).toBeInTheDocument();
    });

    it("renders the 'Create patient' submit button", () => {
      render(<PatientForm patient={null} />);
      expect(screen.getByRole("button", { name: "Create patient" })).toBeInTheDocument();
    });

    it("shows name validation error on empty submit", async () => {
      render(<PatientForm patient={null} />);
      await userEvent.click(screen.getByRole("button", { name: "Create patient" }));
      await waitFor(() => {
        expect(screen.getByText("Name is required")).toBeInTheDocument();
      });
    });

    it("shows description validation error on empty submit", async () => {
      render(<PatientForm patient={null} />);
      await userEvent.click(screen.getByRole("button", { name: "Create patient" }));
      await waitFor(() => {
        expect(screen.getByText("Description is required")).toBeInTheDocument();
      });
    });

    it("shows URL validation error for invalid avatar URL", async () => {
      render(<PatientForm patient={null} />);
      await userEvent.type(screen.getByLabelText("Name"), "Test Patient");
      await userEvent.type(screen.getByLabelText("Avatar URL"), "not-a-url");
      await userEvent.type(screen.getByLabelText("Description"), "Some description");
      await userEvent.click(screen.getByRole("button", { name: "Create patient" }));
      await waitFor(() => {
        expect(screen.getByText("Must be a valid URL")).toBeInTheDocument();
      });
    });

    it("calls addPatient and addToast on valid submission", async () => {
      render(<PatientForm patient={null} />);
      await userEvent.type(screen.getByLabelText("Name"), "New Patient");
      await userEvent.type(screen.getByLabelText("Description"), "A new patient");
      await userEvent.click(screen.getByRole("button", { name: "Create patient" }));
      await waitFor(() => {
        expect(mockAddPatient).toHaveBeenCalledOnce();
        expect(mockAddToast).toHaveBeenCalledWith({
          type: "success",
          message: "Patient added succesfully",
        });
        expect(mockClose).toHaveBeenCalledOnce();
      });
    });

    it("new patient gets an id and createdAt", async () => {
      render(<PatientForm patient={null} />);
      await userEvent.type(screen.getByLabelText("Name"), "New Patient");
      await userEvent.type(screen.getByLabelText("Description"), "A new patient");
      await userEvent.click(screen.getByRole("button", { name: "Create patient" }));
      await waitFor(() => {
        const calledWith = mockAddPatient.mock.calls[0][0];
        expect(calledWith.id).toBeDefined();
        expect(calledWith.createdAt).toBeInstanceOf(Date);
      });
    });

    it("shows an error toast if addPatient throws", async () => {
      mockAddPatient.mockImplementationOnce(() => {
        throw new Error("unexpected error");
      });
      render(<PatientForm patient={null} />);
      await userEvent.type(screen.getByLabelText("Name"), "New Patient");
      await userEvent.type(screen.getByLabelText("Description"), "A new patient");
      await userEvent.click(screen.getByRole("button", { name: "Create patient" }));
      await waitFor(() => {
        expect(mockAddToast).toHaveBeenCalledWith({
          type: "error",
          message: "Failed to add patient. Please try again.",
        });
        expect(mockClose).not.toHaveBeenCalled();
      });
    });
  });

  describe("edit mode (patient provided)", () => {
    it("renders 'Edit patient' as the heading", () => {
      render(<PatientForm patient={existingPatient} />);
      expect(screen.getByText("Edit patient")).toBeInTheDocument();
    });

    it("renders the 'Save changes' submit button", () => {
      render(<PatientForm patient={existingPatient} />);
      expect(screen.getByRole("button", { name: "Save changes" })).toBeInTheDocument();
    });

    it("pre-fills the form with the patient's existing data", () => {
      render(<PatientForm patient={existingPatient} />);
      expect(screen.getByLabelText<HTMLInputElement>("Name").value).toBe("Jane Doe");
      expect(screen.getByLabelText<HTMLTextAreaElement>("Description").value).toBe(
        "Experienced patient"
      );
    });

    it("calls updatePatient on valid submission", async () => {
      render(<PatientForm patient={existingPatient} />);
      await userEvent.click(screen.getByRole("button", { name: "Save changes" }));
      await waitFor(() => {
        expect(mockUpdatePatient).toHaveBeenCalledOnce();
        expect(mockAddPatient).not.toHaveBeenCalled();
      });
    });

    it("adds a success toast after updating", async () => {
      render(<PatientForm patient={existingPatient} />);
      await userEvent.click(screen.getByRole("button", { name: "Save changes" }));
      await waitFor(() => {
        expect(mockAddToast).toHaveBeenCalledWith({
          type: "success",
          message: "Patient updated succesfully",
        });
      });
    });

    it("closes the modal after saving", async () => {
      render(<PatientForm patient={existingPatient} />);
      await userEvent.click(screen.getByRole("button", { name: "Save changes" }));
      await waitFor(() => {
        expect(mockClose).toHaveBeenCalledOnce();
      });
    });

    it("shows an error toast if updatePatient throws", async () => {
      mockUpdatePatient.mockImplementationOnce(() => {
        throw new Error("unexpected error");
      });
      render(<PatientForm patient={existingPatient} />);
      await userEvent.click(screen.getByRole("button", { name: "Save changes" }));
      await waitFor(() => {
        expect(mockAddToast).toHaveBeenCalledWith({
          type: "error",
          message: "Failed to update patient. Please try again.",
        });
        expect(mockClose).not.toHaveBeenCalled();
      });
    });
  });

  describe("cancel button", () => {
    it("calls close when Cancel is clicked", async () => {
      render(<PatientForm patient={null} />);
      await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
      expect(mockClose).toHaveBeenCalledOnce();
    });

    it("does not submit the form when Cancel is clicked", async () => {
      render(<PatientForm patient={null} />);
      await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
      expect(mockAddPatient).not.toHaveBeenCalled();
      expect(mockUpdatePatient).not.toHaveBeenCalled();
    });
  });
});
