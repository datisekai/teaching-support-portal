import { useRef, useCallback } from "react";
import { Toast } from "primereact/toast";

interface ToastOptions {
  severity?: "success" | "info" | "warn" | "error" | "secondary" | "contrast";
  summary?: string;
  detail: string;
  life?: number;
}

export function useToast() {
  const toastRef = useRef<Toast>(null);

  const showToast = ({
    severity = "info",
    summary = "",
    detail,
    life = 3000,
  }: ToastOptions) => {
    console.log("toast", toastRef);
    toastRef.current?.show({
      severity,
      summary,
      detail,
      life,
    });
  };

  return { toastRef, showToast };
}
