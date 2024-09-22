import { Toast } from "primereact/toast";
import { useToast } from "../hooks/useToast";

export default function ToastProvider() {
    const { toastRef } = useToast();

    return (
        <Toast ref={toastRef} />
    );
}
