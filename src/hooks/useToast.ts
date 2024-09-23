import { useContext } from "react";
import { ToastContext } from "../layouts/ToastProvider";

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }

  const { showToast } = context;
  return { showToast };
};
