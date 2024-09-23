import { ConfirmDialog } from "primereact/confirmdialog";
import { Outlet } from "react-router-dom";
import DynamicModal from "./DynamicModal";
import ToastProvider from "./ToastProvider";


const MasterLayout = () => {



    return (
        <>
            <ToastProvider>
                <Outlet />
                <DynamicModal />
                <ConfirmDialog />
            </ToastProvider>
        </>
    );
};

export default MasterLayout;
