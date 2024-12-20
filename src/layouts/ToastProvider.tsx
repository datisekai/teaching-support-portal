import { Toast } from "primereact/toast";
import React, { createContext, useRef, useContext } from "react";

interface IToastProvider {
  children: React.ReactNode;
}

interface IToastContext {
  showToast: (data: IToast) => void;
}

interface IToast {
  message?: string;
  severity?:
    | "info"
    | "success"
    | "warning"
    | "danger"
    | "secondary"
    | "contrast"
    | "error"
    | "warn";
  summary?: string;
  life?: number;
}

export const ToastContext = createContext<IToastContext | undefined>(undefined);

const translateSeverity = (severity: string) => {
  if (severity === "danger") return "error";
  return severity;
};

const ToastProvider: React.FC<IToastProvider> = ({ children }) => {
  const toastRef = useRef<any>(null);

  const showToast = (data: IToast) => {
    if (toastRef.current) {
      const {
        severity = "success",
        message = "Thành công",
        summary = "Thành công",
        life = 3000,
      } = data;
      toastRef.current.show({
        summary,
        severity: translateSeverity(severity),
        detail: message,
        life,
      });
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast ref={toastRef} />
      <>{children}</>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
