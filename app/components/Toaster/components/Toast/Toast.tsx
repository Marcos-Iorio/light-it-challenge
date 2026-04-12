"use client";

import { IToast } from "@/app/types";
import useToastStore from "@/stores/toastStore";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface ToastProp {
  toast: IToast;
  timeout?: number;
}

const Toast = ({ toast, timeout }: ToastProp) => {
  const { removeToast } = useToastStore();
  const [isExiting, setIsExiting] = useState(false);

  const dismiss = () => setIsExiting(true);

  useEffect(() => {
    const timer = setTimeout(dismiss, timeout);
    return () => clearTimeout(timer);
  }, [timeout]);

  const handleAnimationEnd = () => {
    if (isExiting) removeToast(toast.id);
  };

  let toastBgColor: string;

  if (toast.type === "error") {
    toastBgColor = "bg-red-300 border border-red-400";
  } else if (toast.type === "success") {
    toastBgColor = "bg-green-50 border border-green-200";
  } else {
    toastBgColor = "bg-blue-50 border border-blue-200";
  }

  return (
    <article
      className={`${toastBgColor} ${isExiting ? "animate-toast-out" : "animate-toast-in"} w-[calc(100vw-2.5rem)] md:w-96 min-h-12 h-auto shadow-lg rounded-xl flex flex-row items-center px-3 gap-2 py-2`}
      onAnimationEnd={handleAnimationEnd}
    >
      <button
        className="text-black p-2 bg-black/20 hover:bg-black/30 rounded-full h-5 w-5 grid place-content-center cursor-pointer"
        onClick={dismiss}
      >
        <X size={15} />
      </button>
      <p
        className={`${toast.type === "error" ? "text-red-900" : "text-green-800"} font-medium font-nunito`}
      >
        {toast.message}
      </p>
    </article>
  );
};

export default Toast;
