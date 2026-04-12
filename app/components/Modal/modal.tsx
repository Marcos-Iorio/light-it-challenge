"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

interface IModal {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
  action?: () => void;
  className?: string;
}

const Modal = ({ children, onClose, isOpen, action, className }: IModal) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
    } else if (shouldRender) {
      setIsClosing(true);
    }
  }, [isOpen]);

  const handleBackdropAnimationEnd = () => {
    if (isClosing) {
      setShouldRender(false);
      setIsClosing(false);
    }
  };

  if (!shouldRender) return null;

  return (
    <section
      className={`fixed top-0 left-0 w-screen h-screen bg-black/20 backdrop-blur-sm grid place-content-end md:place-content-center z-40 ${isClosing ? "animate-backdrop-out" : "animate-backdrop-in"}`}
      onClick={onClose}
      onAnimationEnd={handleBackdropAnimationEnd}
    >
      <div
        className={`${className} ${isClosing ? "animate-modal-out" : "animate-modal-in"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute bottom-0 top-4 right-4 text-black p-4 md:p-5 bg-black/20 hover:bg-black/30 rounded-full h-5 w-5 grid place-content-center cursor-pointer"
          onClick={onClose}
        >
          <X />
        </button>
        {children}
      </div>
    </section>
  );
};

export default Modal;
