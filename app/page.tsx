import AddPatientButton from "./components/AddPatientButton/add-patient-button";
import PatientList from "./components/Patient/component/PatientList/patient-list";
import PatientStoreInitializer from "./components/Patient/patient-store-initializator";
import Toaster from "./components/Toaster/toaster";
import { Patient } from "./types";

const HomePage = async () => {
  const response = await fetch(
    "https://63bedcf7f5cfc0949b634fc8.mockapi.io/users",
  );

  const patientsData: Patient[] = await response.json();

  return (
    <div className="bg-[#f5f3e6] min-h-screen h-auto w-screen relative">
      <PatientStoreInitializer patients={patientsData} />
      <PatientList />
      <AddPatientButton />
      <Toaster />
    </div>
  );
};

export default HomePage;
