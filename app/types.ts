import React from "react";

export interface Patient {
  id: string;
  createdAt: Date;
  name: string;
  avatar: string;
  description: string;
  website: string;
  password?: string;
  password_confirmation?: string;
}

export interface ButtonProps {
  action: () => void;
  text?: string;
  className?: string;
  children?: React.ReactNode;
}

export type ToastType = "success" | "error" | "information";

export interface IToast {
  id?: string;
  type: ToastType;
  message: string;
}
