import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Toaster from "@/app/components/Toaster/toaster";
import { IToast } from "@/app/types";

const mockToasts: IToast[] = [];

vi.mock("@/stores/toastStore", () => ({
  default: () => ({ toasts: mockToasts }),
}));

// Toast sub-component renders the message – mock it to avoid timer/store side-effects
vi.mock("@/app/components/Toaster/components/Toast/Toast", () => ({
  default: ({ toast }: { toast: IToast }) => <div data-testid="toast">{toast.message}</div>,
}));

describe("Toaster", () => {
  it("renders no toasts when the store is empty", () => {
    mockToasts.length = 0;
    render(<Toaster />);
    expect(screen.queryAllByTestId("toast")).toHaveLength(0);
  });

  it("renders one toast per item in the store", () => {
    mockToasts.length = 0;
    mockToasts.push(
      { id: "1", type: "success", message: "Done" },
      { id: "2", type: "error", message: "Fail" }
    );
    render(<Toaster />);
    expect(screen.getAllByTestId("toast")).toHaveLength(2);
  });

  it("renders toast messages", () => {
    mockToasts.length = 0;
    mockToasts.push({ id: "1", type: "success", message: "Hello" });
    render(<Toaster />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("defaults to left-top position class", () => {
    mockToasts.length = 0;
    const { container } = render(<Toaster />);
    const section = container.querySelector("section")!;
    expect(section.className).toContain("left-5");
    expect(section.className).toContain("top-5");
  });

  it("applies bottom-right position class", () => {
    mockToasts.length = 0;
    const { container } = render(<Toaster position="bottom-right" />);
    const section = container.querySelector("section")!;
    expect(section.className).toContain("bottom-5");
    expect(section.className).toContain("right-5");
  });

  it("applies bottom-left position class", () => {
    mockToasts.length = 0;
    const { container } = render(<Toaster position="bottom-left" />);
    const section = container.querySelector("section")!;
    expect(section.className).toContain("bottom-5");
    expect(section.className).toContain("left-5");
  });
});
