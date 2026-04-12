import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PatientCard from "@/app/components/Patient/component/PatientCard/patient-card";
import { Patient } from "@/app/types";

const mockOpen = vi.fn();

vi.mock("@/stores/modalStore", () => ({
  useModalStore: () => ({ open: mockOpen }),
}));

const patient: Patient = {
  id: "abc123",
  name: "Alice Smith",
  avatar: "https://example.com/alice.jpg",
  description: "Loves hiking and outdoor activities.",
  website: "https://alice.com",
  createdAt: new Date("2024-03-01"),
};

beforeEach(() => {
  mockOpen.mockClear();
});

describe("PatientCard", () => {
  it("renders the patient name", () => {
    render(<PatientCard {...patient} />);
    expect(screen.getByText("Alice Smith")).toBeInTheDocument();
  });

  it("renders the patient description", () => {
    render(<PatientCard {...patient} />);
    expect(screen.getByText("Loves hiking and outdoor activities.")).toBeInTheDocument();
  });

  it("renders a 'See more' button", () => {
    render(<PatientCard {...patient} />);
    expect(screen.getByText("See more")).toBeInTheDocument();
  });

  it("calls modal open with the patient when 'See more' is clicked", async () => {
    render(<PatientCard {...patient} />);
    await userEvent.click(screen.getByText("See more"));
    expect(mockOpen).toHaveBeenCalledOnce();
    expect(mockOpen).toHaveBeenCalledWith(patient);
  });

  it("renders a patient picture with the avatar URL", () => {
    render(<PatientCard {...patient} />);
    expect(screen.getByRole("img")).toHaveAttribute("src", patient.avatar);
  });

  it("renders the patient picture with default avatar when avatar is empty", () => {
    render(<PatientCard {...patient} avatar="" />);
    expect(screen.getByRole("img")).toHaveAttribute("src", "/avatar-default.png");
  });
});
