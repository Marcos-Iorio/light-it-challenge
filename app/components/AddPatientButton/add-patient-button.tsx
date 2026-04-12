"use client";

import { useModalStore } from "@/stores/modalStore";
import Button from "../Button/button";
import { Plus } from "lucide-react";

const AddPatientButton = () => {
  const { open } = useModalStore();

  return (
    <Button
      action={() => open(null, "create")}
      className="w-10 h-10 md:w-15 md:h-15 bg-e-green hover:bg-e-green-hover fixed right-5 bottom-5 md:right-10 md:bottom-10 grid place-content-center rounded-full cursor-pointer"
    >
      <Plus color="white" />
    </Button>
  );
};

export default AddPatientButton;
