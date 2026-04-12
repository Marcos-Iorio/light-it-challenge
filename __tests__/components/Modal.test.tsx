import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "@/app/components/Modal/modal";

const defaultProps = {
  onClose: vi.fn(),
  isOpen: true,
  children: <p>Modal content</p>,
};

describe("Modal", () => {
  it("renders nothing when isOpen is false", () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText("Modal content")).not.toBeInTheDocument();
  });

  it("renders children when isOpen is true", () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("calls onClose when the backdrop is clicked", () => {
    const onClose = vi.fn();
    const { container } = render(<Modal {...defaultProps} onClose={onClose} />);
    const backdrop = container.querySelector("section")!;
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose when the X button is clicked", () => {
    const onClose = vi.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);
    const closeBtn = screen.getAllByRole("button").find((b) => b.querySelector("svg"));
    fireEvent.click(closeBtn!);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("does not call onClose when the inner content is clicked", () => {
    const onClose = vi.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);
    fireEvent.click(screen.getByText("Modal content"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("applies an extra className to the inner container", () => {
    const { container } = render(<Modal {...defaultProps} className="extra-class" />);
    const inner = container.querySelector(".extra-class");
    expect(inner).toBeInTheDocument();
  });
});
