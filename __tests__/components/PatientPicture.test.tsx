import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PatientPicture from "@/app/components/Patient/component/PatientPicture/patient-picture";

describe("PatientPicture", () => {
  it("renders an img with the provided avatar URL", () => {
    render(<PatientPicture avatar="https://example.com/photo.jpg" />);
    expect(screen.getByRole("img")).toHaveAttribute("src", "https://example.com/photo.jpg");
  });

  it("uses the default avatar when avatar prop is null", () => {
    render(<PatientPicture avatar={null} />);
    expect(screen.getByRole("img")).toHaveAttribute("src", "/avatar-default.png");
  });

  it("uses the default avatar when avatar prop is empty string", () => {
    render(<PatientPicture avatar="" />);
    expect(screen.getByRole("img")).toHaveAttribute("src", "/avatar-default.png");
  });

  it("falls back to default avatar on image load error", () => {
    render(<PatientPicture avatar="https://broken.url/image.png" />);
    const img = screen.getByRole("img");
    fireEvent.error(img);
    expect(img).toHaveAttribute("src", "/avatar-default.png");
  });

  it("does not loop on repeated errors (hasError guard)", () => {
    render(<PatientPicture avatar="https://broken.url/image.png" />);
    const img = screen.getByRole("img");
    fireEvent.error(img);
    fireEvent.error(img);
    // Still shows default, not crashed or looped
    expect(img).toHaveAttribute("src", "/avatar-default.png");
  });

  it("renders an accessible alt text", () => {
    render(<PatientPicture avatar="https://example.com/photo.jpg" />);
    expect(screen.getByAltText("Patient picture")).toBeInTheDocument();
  });
});
