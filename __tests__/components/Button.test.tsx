import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "@/app/components/Button/button";

describe("Button", () => {
  it("renders the text prop", () => {
    render(<Button action={() => {}} text="Click me" />);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("renders children instead of text when both provided", () => {
    render(
      <Button action={() => {}} text="Text prop">
        <span>Child content</span>
      </Button>
    );
    expect(screen.getByText("Child content")).toBeInTheDocument();
    expect(screen.queryByText("Text prop")).not.toBeInTheDocument();
  });

  it("calls action when clicked", async () => {
    const mockAction = vi.fn();
    render(<Button action={mockAction} text="Click me" />);
    await userEvent.click(screen.getByText("Click me"));
    expect(mockAction).toHaveBeenCalledOnce();
  });

  it("applies the default className when none provided", () => {
    render(<Button action={() => {}} text="Btn" />);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("bg-e-green");
  });

  it("applies a custom className", () => {
    render(<Button action={() => {}} text="Btn" className="custom-class" />);
    expect(screen.getByRole("button").className).toContain("custom-class");
  });

  it("has type=button to avoid accidental form submission", () => {
    render(<Button action={() => {}} text="Btn" />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });
});
