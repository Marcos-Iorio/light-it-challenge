"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Patient } from "@/app/types";
import { useModalStore } from "@/stores/modalStore";
import { usePatientStore } from "@/stores/patientStore";
import Button from "@/app/components/Button/button";
import useToastStore from "@/stores/toastStore";
import { patientFormSchema, PatientFormValues } from "./patient-form.schema";

interface PatientFormProps {
  patient: Patient | null;
}

const PatientForm = ({ patient }: PatientFormProps) => {
  const { close } = useModalStore();
  const { updatePatient, addPatient } = usePatientStore();
  const { addToast } = useToastStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientFormValues>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      name: patient?.name ?? "",
      avatar: patient?.avatar ?? "",
      description: patient?.description ?? "",
      website: patient?.website ?? "",
    },
  });

  const onSubmit = (data: PatientFormValues) => {
    try {
      if (patient) {
        updatePatient({
          ...patient,
          ...data,
          avatar: data.avatar ?? "",
          website: data.website ?? "",
          description: data.description,
        });
        addToast({ type: "success", message: "Patient updated succesfully" });
      } else {
        addPatient({
          ...data,
          avatar: data.avatar ?? "",
          website: data.website ?? "",
          description: data.description,
          id: crypto.randomUUID(),
          createdAt: new Date(),
        });
        addToast({ type: "success", message: "Patient added succesfully" });
      }
      close();
    } catch {
      addToast({
        type: "error",
        message: patient
          ? "Failed to update patient. Please try again."
          : "Failed to add patient. Please try again.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 h-full"
    >
      <h2 className="text-black font-nunito font-bold text-2xl">
        {patient ? "Edit patient" : "New patient"}
      </h2>
      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-sm" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          {...register("name")}
          className={`border rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-e-green ${errors.name ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.name && (
          <span className="text-red-500 text-xs">{errors.name.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-sm" htmlFor="avatar">
          Avatar URL
        </label>
        <input
          id="avatar"
          {...register("avatar")}
          className={`border rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-e-green ${errors.avatar ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.avatar && (
          <span className="text-red-500 text-xs">{errors.avatar.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-sm" htmlFor="website">
          Website
        </label>
        <input
          id="website"
          {...register("website")}
          className={`border rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-e-green ${errors.website ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.website && (
          <span className="text-red-500 text-xs">{errors.website.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <label className="text-gray-500 text-sm" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          {...register("description")}
          rows={4}
          className={`border rounded-md px-3 py-2 text-black resize-none focus:outline-none focus:ring-2 focus:ring-e-green ${errors.description ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.description && (
          <span className="text-red-500 text-xs">
            {errors.description.message}
          </span>
        )}
      </div>
      <div className="flex gap-3 mt-auto">
        <Button
          action={close}
          text="Cancel"
          className="w-full h-10 border border-gray-300 rounded-full font-bold cursor-pointer hover:bg-gray-100 text-black"
        />
        <button
          type="submit"
          className="w-full h-10 bg-e-green rounded-full mt-auto font-bold cursor-pointer hover:bg-e-green-hover"
        >
          {patient ? "Save changes" : "Create patient"}
        </button>
      </div>
    </form>
  );
};

export default PatientForm;
