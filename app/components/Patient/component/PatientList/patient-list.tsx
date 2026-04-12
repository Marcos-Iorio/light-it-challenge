"use client";

import PatientCard from "../PatientCard/patient-card";
import PatientDetail from "../PatientDetail/patient-detail";
import { usePatientStore } from "@/stores/patientStore";
import { useModalStore } from "@/stores/modalStore";

const PatientList = () => {
  const patients = usePatientStore((s) => s.patients);
  const { patient } = useModalStore();

  return (
    <>
      <ul className="flex flex-wrap flex-col gap-6 py-16 px-8 justify-center md:flex-row">
        {patients.map((patient) => (
          <PatientCard {...patient} key={patient.id} />
        ))}
      </ul>
      <PatientDetail patient={patient} />
    </>
  );
};

export default PatientList;
