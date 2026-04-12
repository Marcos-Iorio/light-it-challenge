"use client";

import { useState } from "react";

import { Patient } from "@/app/types";

interface PatientPictureProps {
  avatar: Patient["avatar"] | null;
  name?: Patient["name"];
  className?: string;
}

const PatientPicture = ({ avatar, name, className }: PatientPictureProps) => {
  const [imgSrc, setImgSrc] = useState<string>(avatar || "/avatar-default.png");
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc("/avatar-default.png");
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        className="w-full h-full object-cover"
        src={imgSrc}
        onError={handleError}
        alt={name ? `${name} profile picture` : "Patient profile picture"}
      />
    </div>
  );
};

export default PatientPicture;
