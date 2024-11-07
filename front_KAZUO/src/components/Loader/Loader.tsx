import React from "react";
import { Loader2 } from "lucide-react";

const Loader = ({
  message = "Cargando...",
  size = "8",
  color = "text-blue-500",
}) => {
  const sizeClasses = size === "small" ? "h-4 w-4" : "h-8 w-8";

  return (
    <div className="flex items-center">
      <Loader2 className={`animate-spin ${sizeClasses} ${color}`} />
      {message && <span className="ml-2">{message}</span>}
    </div>
  );
};

export default Loader;
