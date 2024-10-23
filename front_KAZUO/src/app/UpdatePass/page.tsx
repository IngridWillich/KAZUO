import UpdatePassForm from "@/components/UpdatePassword/UpdatePaswordForm";
import ProtectedRoutes from "@/context/ProtectedRoutes";
import React from "react";

const UpdatePass = () => {
  return (
    <div>
      <ProtectedRoutes>
        <UpdatePassForm />
      </ProtectedRoutes>
    </div>
  );
};

export default UpdatePass;
