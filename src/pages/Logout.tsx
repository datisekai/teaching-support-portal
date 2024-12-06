import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";
import { pathNames } from "../constants";
import { useAuthStore, useCommonStore } from "../stores";
import { useEffect } from "react";

const Logout = () => {
  const { logout } = useAuthStore();
  const setHeaderTitle = useCommonStore((state) => state.setHeaderTitle);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(pathNames.LOGIN);
  };

  useEffect(() => {
    setHeaderTitle("Đăng xuất");
  }, []);

  const footer = (
    <>
      <Button onClick={handleLogout} label="Có" icon="pi pi-check" />
      <Button
        onClick={() => navigate(pathNames.HOME)}
        label="Huỷ"
        severity="secondary"
        icon="pi pi-times"
        style={{ marginLeft: "0.5em" }}
      />
    </>
  );
  return (
    <div className="tw-flex tw-justify-center tw-items-center h-full">
      <Card
        title="Đăng xuất"
        subTitle="Bạn có chắc chắn muốn đăng xuất?"
        footer={footer}
        className="md:w-25rem"
      ></Card>
    </div>
  );
};

export default Logout;
