import Products from "@/components/Products/Products";
import ProtectedRoutesProducts from "@/context/ProtectedRoutesProducts";
import React from "react";

const page = ({ params }: { params: { storeId: string } }) => {
  return (
    <div>
      <ProtectedRoutesProducts>
        <Products storeId={params.storeId} />
      </ProtectedRoutesProducts>
    </div>
  );
};

export default page;
