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
    <div className="flex min-h-screen">
      <div
        className={`fixed top-0 left-0 h-full bg-gray-100 shadow-md z-20 transition-transform duration-300 ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        } ${isMobile ? "w-full" : "w-80"}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="inline-flex items-center gap-2">
              <Avatar image="/public/logo.png" size="xlarge" shape="circle" />
              <span className="font-semibold text-2xl text-primary">
                IT SGU
              </span>
            </span>
            {isMobile && (
              <i
                className="pi pi-times border-primary border-2 p-2 rounded-full text-primary cursor-pointer hover:border-blue-600 hover:text-blue-600"
                onClick={handleCloseSidebar}
              />
            )}
          </div>
          <div className="overflow-y-auto flex-1">
            <ul className="list-none p-3 m-0">
              {dataMenu.map((item, index) => (
                <li key={index}>
                  <div
                    onClick={() => handleExpandClick(index)}
                    className="p-ripple p-3 flex items-center justify-between text-600 cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                  >
                    <span className="font-medium">{item.title}</span>
                    <i
                      className={`pi pi-chevron-down transition-transform duration-300 ${
                        expandedMenus[index] ? "rotate-180" : ""
                      }`}
                    ></i>
                    <Ripple />
                  </div>
                  <ul
                    className={`list-none p-0 m-0 overflow-hidden transition-max-height duration-300 ${
                      expandedMenus[index] ? "max-h-40" : "max-h-0"
                    }`}
                  >
                    {item.children.map((child, childIndex) => (
                      <li key={childIndex}>
                        <div
                          onClick={child.command}
                          className="p-ripple flex items-center cursor-pointer p-3 border-round text-700 hover:bg-gray-200 transition-colors duration-200 w-full"
                        >
                          <i className={`${child.icon} mr-2`}></i>
                          <span className="font-medium">{child.title}</span>
                          <Ripple />
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-auto">
            <hr className="mb-3 mx-3 border-top-1 border-none surface-border" />
            <a className="m-3 flex items-center cursor-pointer gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
              <span className="inline-flex items-center gap-2">
                <Avatar
                  image="/public/logo.png"
                  size="xlarge"
                  className="object-cover object-top"
                  shape="circle"
                />
                <span className="font-bold">Amy Elsner</span>
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col transition-all duration-300">
        {/* Header */}
        <header
          className={`bg-gray-100 fixed top-0 left-0 right-0 flex justify-between items-center p-2 shadow-md z-10 transition-all duration-300 ${
            isSidebarVisible ? "ml-80" : "ml-0"
          } md:ml-80`}
        >
          <div className="flex items-center gap-4 min-h-16">
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
                className="mr-2"
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
            <div className="flex items-center justify-center gap-2">
              {renderActionsNMobile()}
            </div>
          )}
        </header>
        <main
          className={`flex-1 p-4 mt-20 transition-all duration-300 ${
            isSidebarVisible ? "ml-80" : "ml-0"
          } md:ml-80`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
