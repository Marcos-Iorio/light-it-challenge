"use client";

import useToastStore from "@/stores/toastStore";
import Toast from "./components/Toast/Toast";

interface ToasterProps {
  position?: "left-top" | "right-top" | "bottom-right" | "bottom-left";
  className?: string;
  timeout?: number;
}

const Toaster = ({
  position = "left-top",
  className,
  timeout = 3000,
}: ToasterProps) => {
  const { toasts } = useToastStore();

  let placement: string;

  switch (position) {
    case "bottom-left":
      placement = "bottom-5 left-5";
      break;
    case "bottom-right":
      placement = "bottom-5 right-5";
      break;
    case "right-top":
      placement = "right-5 top-5";
      break;
    case "left-top":
      placement = "left-5 top-5";
  }

  return (
    <section
      className={`fixed flex flex-col gap-2 top-0 left-0 p-5 md:left-3 md:p-0 md:${placement}`}
    >
      {toasts.map((t) => (
        <Toast toast={t} timeout={timeout} key={t.id} />
      ))}
    </section>
  );
};

export default Toaster;
