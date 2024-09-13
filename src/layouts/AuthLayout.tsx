import React, { useState, useEffect, useRef, useMemo } from "react";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Ripple } from "primereact/ripple";
import { useCommonStore } from "../stores";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import MyHeader from "../components/UI/MyHeader";
import MySideBar from "../components/UI/MySideBar";

const AuthLayout = () => {
  const { header } = useCommonStore();

  const [dataActions, setDataActions] = useState<MenuItem[]>([]);

  const [isSidebarVisible, setIsSidebarVisible] = useState(
    window.innerWidth >= 768
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file);
    }
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const createActionItems = (isMobile: boolean) => {
    return header.actions
      .map((action, index) => {
        switch (action.type) {
          case "button":
            return {
              label: action.title,
              icon: action.icon,
              template: () => (
                <Button
                  key={index}
                  label={action.title}
                  icon={action.icon}
                  onClick={action.onClick}
                  disabled={action.disabled}
                  className="w-full"
                  outlined={!isMobile}
                />
              ),
            };
          case "file":
            return {
              label: action.title,
              icon: action.icon,
              template: () => (
                <div key={index}>
                  <Button
                    label={action.title}
                    icon={action.icon}
                    onClick={handleButtonClick}
                    disabled={action.disabled}
                    className="w-full"
                    outlined={!isMobile}
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
              ),
            };
          default:
            return null;
        }
      })
      .filter((item) => item !== null);
  };
  const renderActionsMobile = () => {
    return createActionItems(true).map((actionItem) => actionItem?.template());
  };

  const renderActions = useMemo(() => {
    return createActionItems(false);
  }, [header.actions]);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth >= 768);
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    setDataActions(renderActions);

    return () => window.removeEventListener("resize", handleResize);
  }, [renderActions]);

  const handleCloseSidebar = () => {
    setIsSidebarVisible(false);
  };
  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  return (
    <div className="tw-flex tw-min-h-screen">
      <MySideBar
        handleCloseSidebar={handleCloseSidebar}
        isMobile={isMobile}
        isSidebarVisible={isSidebarVisible}
      />
      <div className="tw-flex-1 tw-flex tw-flex-col tw-transition-all tw-duration-300">
        {/* Header */}
        <MyHeader
          isSidebarVisible={isSidebarVisible}
          dataActions={dataActions}
          renderActionsMobile={renderActionsMobile}
          header={header}
          isMobile={isMobile}
          toggleSidebar={toggleSidebar}
        />
        <main
          className={`tw-flex-1 tw-p-4 tw-mt-20 tw-transition-all tw-duration-300 ${
            isSidebarVisible ? "md:tw-ml-80" : "md:tw-ml-0"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
