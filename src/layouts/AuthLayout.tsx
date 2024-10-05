import { ProgressSpinner } from "primereact/progressspinner";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import MyFooterAction from "../components/UI/MyFooterAction";
import MyHeader from "../components/UI/MyHeader";
import MySideBar from "../components/UI/MySideBar";
import { pathNames } from "../constants";
import { useAuthStore, useCommonStore } from "../stores";
import { useUserStore } from "../stores/userStore";

const AuthLayout = () => {

  const [isSidebarVisible, setIsSidebarVisible] = useState(
    window.innerWidth >= 768
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { user, permissions, getMe } = useUserStore()
  const { token } = useAuthStore()
  const navigate = useNavigate()
  console.log('user', user);
  console.log('permissions', permissions);

  useEffect(() => {
    if (!token) {
      return navigate(pathNames.LOGIN)
    }
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth >= 768);
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    getMe()

    return () => window.removeEventListener("resize", handleResize);
  }, []);



  const handleCloseSidebar = () => {
    setIsSidebarVisible(false);
  };
  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  if (!user || Object.keys(user).length == 0) {
    return <div className="tw-fixed tw-inset-0  tw-flex tw-justify-center tw-items-center">
      <ProgressSpinner />
    </div>
  }

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
          className={`tw-flex-1 tw-p-4 tw-pt-24 tw-pb-24 tw-transition-all tw-duration-300 ${isSidebarVisible ? "md:tw-ml-80" : "md:tw-ml-0"
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
