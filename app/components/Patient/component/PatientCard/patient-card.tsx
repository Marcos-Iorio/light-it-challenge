"use client";

import { memo } from "react";
import { Patient } from "@/app/types";
import PatientPicture from "../PatientPicture/patient-picture";
import { useModalStore } from "@/stores/modalStore";
import Button from "@/app/components/Button/button";

const PatientCard = (patient: Patient) => {
  const { open } = useModalStore();

  return (
    <li className="max-w-full md:max-w-2/5 lg:max-w-1/4 w-full h-96 flex flex-col gap-8 bg-white p-10 rounded-xl">
      <div className="flex flex-row items-center gap-4 min-w-0">
        <PatientPicture
          avatar={patient.avatar}
          name={patient.name}
          className="max-h-12 h-full max-w-12 w-full rounded-md basis-1/3"
        />
        <h2 className="text-black font-bold text-2xl font-nunito truncate min-w-0">
          {patient.name}
        </h2>
      </div>

      <p className="line-clamp-3 text-black">{patient.description}</p>
      <Button action={() => open(patient)} text="See more" />
    </li>
  );
};

export default memo(PatientCard);
