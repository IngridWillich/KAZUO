import StoreForm from "@/components/StoreForm/StoreForm";
import ProtectedRoutes from "@/context/ProtectedRoutes";
import React from "react";

const page = () => {
  return (
    <div>
      <ProtectedRoutes>
        <StoreForm />
      </ProtectedRoutes>
    </div>
  );
};

export default page;
