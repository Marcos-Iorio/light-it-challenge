"use client";

import { useEffect } from "react";
import { usePatientStore } from "@/stores/patientStore";
import { Patient } from "@/app/types";

const PatientStoreInitializer = ({ patients }: { patients: Patient[] }) => {
  const setPatients = usePatientStore((s) => s.setPatients);

  useEffect(() => {
    setPatients(patients);
  }, [patients, setPatients]);

  return null;
};

export default PatientStoreInitializer;
