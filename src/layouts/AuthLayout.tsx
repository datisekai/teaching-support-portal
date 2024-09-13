import React, { useState, useEffect, useRef, useMemo } from "react";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Ripple } from "primereact/ripple";
import { useCommonStore } from "../stores";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";

interface IMenuItem {
  title: string;
  children: {
    title: string;
    icon: string;
    command: () => void;
  }[];
}

interface ExpandedMenus {
  [key: number]: boolean;
}

const AuthLayout = () => {
  const { header } = useCommonStore();
  const navigate = useNavigate();
  const [dataActions, setDataActions] = useState<MenuItem[]>([]);

  const renderActionsNMobile = () => {
    return header.actions.map((action, index) => {
      switch (action.type) {
        case "button":
          return (
            <Button
              key={index}
              label={action.title}
              icon={action.icon}
              onClick={action.onClick}
              disabled={action.disabled}
              className="w-full"
            />
          );
        case "file":
          return (
            <div>
              <Button
                label={action.title}
                icon={action.icon}
                onClick={handleButtonClick}
                disabled={action.disabled}
                className="w-full"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </div>
          );
        default:
          return null;
      }
    });
  };

  const dataMenu: IMenuItem[] = [
    {
      title: "Lớp",
      children: [
        {
          title: "Danh sách lớp",
          icon: "pi pi-fw pi-user",
          command: () => {
            console.log("Lop");
            navigate("class");
          },
        },
        {
          title: "Danh sách lớp2",
          icon: "pi pi-fw pi-user",
          command: () => {
            console.log("Lop");
            navigate("class2");
          },
        },
      ],
    },
    {
      title: "Khoahoc",
      children: [
        {
          title: "Danh sách khoa hoc",
          icon: "pi pi-fw pi-user",
          command: () => {
            console.log("Lop");
          },
        },
        {
          title: "Danh sách khoa hoc2",
          icon: "pi pi-fw pi-user",
          command: () => {
            console.log("Lop");
          },
        },
      ],
    },
  ];

  const menuRight = useRef<Menu | null>(null);

  const [expandedMenus, setExpandedMenus] = useState<ExpandedMenus>({});
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    window.innerWidth >= 768
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

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

  const renderActions = useMemo(() => {
    const updatedDataActions: MenuItem[] = [];

    header.actions.forEach((action, index) => {
      switch (action.type) {
        case "button":
          updatedDataActions.push({
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
                outlined
              />
            ),
          });
          break;

        case "file":
          updatedDataActions.push({
            label: action.title,
            icon: action.icon,
            template: () => (
              <div>
                <Button
                  label={action.title}
                  icon={action.icon}
                  onClick={handleButtonClick}
                  disabled={action.disabled}
                  className="w-full"
                  outlined
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
          });
          break;

        default:
          break;
      }
    });

    return updatedDataActions;
  }, [header.actions]);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth >= 768);
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    setDataActions(renderActions);

    return () => window.removeEventListener("resize", handleResize);
  }, [renderActions]);

  const handleExpandClick = (index: number) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleCloseSidebar = () => {
    setIsSidebarVisible(false);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };
  return (
    <div className="tw-flex tw-min-h-screen">
      <div
        className={`tw-fixed tw-top-0 tw-left-0 tw-h-full tw-bg-gray-100 tw-shadow-md tw-z-20 tw-transition-transform tw-duration-300 ${isSidebarVisible ? "tw-translate-x-0" : "-tw-translate-x-full"
          } ${isMobile ? "tw-w-full" : "tw-w-80"}`}
      >
        <div className="tw-flex tw-flex-col tw-h-full">
          <div className="tw-flex tw-items-center tw-justify-between tw-px-4 tw-py-3">
            <span className="tw-inline-flex tw-items-center tw-gap-2">
              <Avatar image="/public/logo.png" size="xlarge" shape="circle" />
              <span className="tw-font-semibold tw-text-2xl tw-text-primary">
                IT SGU
              </span>
            </span>
            {isMobile && (
              <i
                className="pi pi-times tw-border-primary tw-border-2 tw-p-2 tw-rounded-full tw-text-primary tw-cursor-pointer hover:tw-border-blue-600 hover:tw-text-blue-600"
                onClick={handleCloseSidebar}
              />
            )}
          </div>
          <div className="tw-overflow-y-auto tw-flex-1">
            <ul className="tw-list-none tw-p-3 tw-m-0">
              {dataMenu.map((item, index) => (
                <li key={index}>
                  <div
                    onClick={() => handleExpandClick(index)}
                    className="tw-p-ripple tw-p-3 tw-flex tw-items-center tw-justify-between tw-text-600 tw-cursor-pointer hover:tw-bg-gray-200 tw-transition-colors tw-duration-200"
                  >
                    <span className="tw-font-medium">{item.title}</span>
                    <i
                      className={`pi pi-chevron-down tw-transition-transform tw-duration-300 ${expandedMenus[index] ? "tw-rotate-180" : ""
                        }`}
                    ></i>
                    <Ripple />
                  </div>
                  <ul
                    className={`tw-list-none tw-p-0 tw-m-0 tw-overflow-hidden tw-transition-max-height tw-duration-300 ${expandedMenus[index] ? "tw-max-h-40" : "tw-max-h-0"
                      }`}
                  >
                    {item.children.map((child, childIndex) => (
                      <li key={childIndex}>
                        <div
                          onClick={child.command}
                          className="tw-p-ripple tw-flex tw-items-center tw-cursor-pointer tw-p-3 tw-border-round tw-text-700 hover:tw-bg-gray-200 tw-transition-colors tw-duration-200 tw-w-full"
                        >
                          <i className={`${child.icon} tw-mr-2`}></i>
                          <span className="tw-font-medium">{child.title}</span>
                          <Ripple />
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <div className="tw-mt-auto">
            <hr className="tw-mb-3 tw-mx-3 tw-border-top-1 tw-border-none tw-surface-border" />
            <a className="tw-m-3 tw-flex tw-items-center tw-cursor-pointer tw-gap-2 tw-border-round tw-text-700 hover:tw-surface-100 tw-transition-duration-150 tw-transition-colors tw-p-ripple">
              <span className="tw-inline-flex tw-items-center tw-gap-2">
                <Avatar
                  image="/public/logo.png"
                  size="xlarge"
                  className="tw-object-cover tw-object-top"
                  shape="circle"
                />
                <span className="tw-font-bold">Amy Elsner</span>
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className="tw-flex-1 tw-flex tw-flex-col tw-transition-all tw-duration-300">
        {/* Header */}
        <header
          className={`tw-bg-gray-100 tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-flex tw-justify-between tw-items-center tw-p-2 tw-shadow-md tw-z-10 tw-transition-all tw-duration-300 ${isSidebarVisible ? "tw-ml-80" : "tw-ml-0"
            } md:tw-ml-80`}
        >
          <div className="tw-flex tw-items-center tw-gap-4 tw-min-h-16">
            <Button icon="pi pi-bars" onClick={toggleSidebar} />
            <div>{header.title}</div>
          </div>
          {isMobile ? (
            <div>
              <Menu
                model={dataActions}
                ref={menuRight}
                id="popup_menu_right"
                popupAlignment="right"
                popup
              />
              <Button
                label="Show Right"
                iconPos="right"
                icon="pi pi-angle-down"
                className="tw-mr-2"
                onClick={(event) => {
                  if (menuRight.current) {
                    menuRight.current.toggle(event);
                  }
                }}
                aria-controls="popup_menu_right"
                aria-haspopup
              />
            </div>
          ) : (
            <div className="tw-flex tw-items-center tw-justify-center tw-gap-2">
              {renderActionsNMobile()}
            </div>
          )}
        </header>
        <main
          className={`tw-flex-1 tw-p-4 tw-mt-20 tw-transition-all tw-duration-300 ${isSidebarVisible ? "tw-ml-80" : "tw-ml-0"
            } md:tw-ml-80`}
        >
          <Outlet />
        </main>
      </div>
    </div>

  );
};

export default AuthLayout;
