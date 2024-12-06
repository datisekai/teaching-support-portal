import { ProgressSpinner } from "primereact/progressspinner";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import MyFooterAction from "../components/UI/MyFooterAction";
import MyHeader from "../components/UI/MyHeader";
import MySideBar from "../components/UI/MySideBar";
import { ModalName, pathNames } from "../constants";
import { useAuthStore, useCommonStore, useModalStore } from "../stores";
import { useUserStore } from "../stores/userStore";
import { useSocketStore } from "../stores/socketStore";
import { useClassStore } from "../stores/classStore";

const AuthLayout = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    window.innerWidth >= 768
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { user, permissions, getMe } = useUserStore();
  const { token } = useAuthStore();
  const navigate = useNavigate();
  const { connectSocket, disconnectSocket } = useSocketStore();
  const { fetchClasses } = useClassStore();
  const { onToggle, visible } = useModalStore();

  useEffect(() => {
    if (!token) {
      return navigate(pathNames.LOGIN);
    }

    initData();
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth >= 768);
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    getMe();

    connectSocket();

    return () => {
      window.removeEventListener("resize", handleResize);
      disconnectSocket();
    };
  }, []);

  const initData = () => {
    Promise.allSettled([fetchClasses({ pagination: false })]);
  };

  useEffect(() => {
    if (user && Object.keys(user).length > 0 && !user?.name && !visible) {
      onToggle(ModalName.UPDATE_PROFILE, {
        header: "Cập nhật hồ sơ",
        content: {
          closeable: user?.name ? true : false,
        },
        style: "!tw-w-[30rem]",
      });
    }
  }, [user, visible]);

  const handleCloseSidebar = () => {
    setIsSidebarVisible(false);
  };
  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  if (!user || Object.keys(user).length == 0) {
    return (
      <div className="tw-fixed tw-inset-0  tw-flex tw-justify-center tw-items-center">
        <ProgressSpinner />
      </div>
    );
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
          className={`tw-flex-1 tw-p-4 tw-pt-24 tw-pb-24 tw-transition-all tw-duration-300 ${
            isSidebarVisible ? "md:tw-ml-80" : "md:tw-ml-0"
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
