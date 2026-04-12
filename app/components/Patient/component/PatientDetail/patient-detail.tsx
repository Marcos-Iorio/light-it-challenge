"use client";

import { Patient } from "@/app/types";
import { useModalStore } from "@/stores/modalStore";
import PatientPicture from "../PatientPicture/patient-picture";
import Button from "@/app/components/Button/button";
import { timeAgo } from "@/utils/timeAgo";

import Modal from "@/app/components/Modal/modal";
import PatientForm from "../PatientForm/patient-form";
import { Edit, Phone } from "lucide-react";

interface PatientFormProps {
  patient: Patient | null;
}

const PatientDetail = ({ patient }: PatientFormProps) => {
  const { isOpen, close, mode, setMode } = useModalStore();

  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      className="bg-white w-screen md:w-140 h-fit max-h-3/4 min-h-140 rounded-xl flex flex-col p-5 gap-3 relative justify-center"
    >
      {mode === "edit" || mode === "create" ? (
        <PatientForm patient={patient} />
      ) : (
        <>
          <div className="flex flex-row gap-5 items-center">
            <PatientPicture
              avatar={patient && patient.avatar}
              name={patient?.name}
              className="rounded-md w-20 h-20 md:w-32 md:h-32"
            />
            <div className="flex flex-col gap-3 h-full">
              {patient && (
                <span className="text-gray-300 text-sm">
                  Created at {timeAgo(patient.createdAt)}
                </span>
              )}
              <p className="font-nunito text-2xl md:text-3xl text-black font-bold">
                {patient && patient.name}
              </p>
              <a href={patient?.website} target="_blank" rel="noopener noreferrer">
                <Phone color="black" />
              </a>
            </div>
          </div>
          <p className="text-black font-montserrat line-clamp-5">
            {patient && patient.description}
          </p>
          <Button action={() => setMode("edit")}>
            <span className="flex flex-row gap-2 justify-center">
              <Edit /> Edit patient
            </span>
          </Button>
        </>
      )}
    </Modal>
  );
};

export default PatientDetail;
