import { ConfirmDialog } from "primereact/confirmdialog";
import { Outlet } from "react-router-dom";
import DynamicModal from "./DynamicModal";
import ToastProvider from "./ToastProvider";


const MasterLayout = () => {



    return (
        <>
            <Outlet />
            <ToastProvider />
            <DynamicModal />
            <ConfirmDialog />
        </>
    );
};

export default MasterLayout;
