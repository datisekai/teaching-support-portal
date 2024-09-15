import { Button } from "primereact/button";
import { MenuItem } from "primereact/menuitem";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import MyFooterAction from "../components/UI/MyFooterAction";
import MyHeader from "../components/UI/MyHeader";
import MySideBar from "../components/UI/MySideBar";
import { useCommonStore } from "../stores";

const AuthLayout = () => {

  const [isSidebarVisible, setIsSidebarVisible] = useState(
    window.innerWidth >= 768
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);


  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth >= 768);
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();


    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        <MyHeader
          isSidebarVisible={isSidebarVisible}
          toggleSidebar={toggleSidebar}
        />
        <main
          className={`tw-flex-1 tw-p-4 tw-mt-20 tw-transition-all tw-duration-300 ${isSidebarVisible ? "md:tw-ml-80" : "md:tw-ml-0"
            }`}
        >
          <Outlet />
        </main>
        <MyFooterAction isSidebarVisible={isSidebarVisible} />
      </div>
    </div>
  );
};

export default AuthLayout;
