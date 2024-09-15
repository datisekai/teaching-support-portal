import { Avatar } from "primereact/avatar";
import { Ripple } from "primereact/ripple";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sidebarData } from "../constants";

interface IMySideBar {
  isSidebarVisible: boolean;
  isMobile: boolean;
  handleCloseSidebar: () => void;
}

interface ExpandedMenus {
  [key: number]: boolean;
}

const MySideBar: React.FC<IMySideBar> = ({
  isSidebarVisible,
  isMobile,
  handleCloseSidebar,
}) => {
  const navigate = useNavigate();
  const [expandedMenus, setExpandedMenus] = useState<ExpandedMenus>({});

  const handleExpandClick = (index: number) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleMenuItemClick = (path?: string) => {
    path && navigate(path);
  };
  return (
    <div
      className={`tw-fixed tw-top-0 tw-left-0 tw-h-full tw-bg-gray-100 tw-shadow-md tw-z-20 tw-transition-transform tw-duration-300 ${isSidebarVisible ? "tw-translate-x-0" : "-tw-translate-x-full"
        } ${isMobile ? "tw-w-full" : "tw-w-80"}`}
    >
      <div className="tw-flex tw-flex-col tw-h-full">
        <div className="tw-flex tw-items-center tw-justify-between tw-px-4 tw-py-3">
          <span className="tw-inline-flex tw-items-center tw-gap-2">
            <Avatar image="/public/logo.png" size="xlarge" shape="circle" />
            <span className="tw-font-semibold tw-text-2xl text-primary">
              IT SGU
            </span>
          </span>
          {isMobile && (
            <i
              style={{ fontSize: "2rem" }}
              className="pi pi-times-circle tw-cursor-pointer tw-text-[#6366f1] hover:tw-text-[#4f46e5]"
              onClick={handleCloseSidebar}
            />
          )}
        </div>
        <div className="tw-overflow-y-auto tw-flex-1">
          <ul className="tw-list-none tw-p-3 tw-m-0">
            {sidebarData.map((item, index) => (
              <li key={index}>
                <div
                  onClick={() => item.children && item.children.length > 0 ? handleExpandClick(index) : handleMenuItemClick(item?.path)}
                  className="tw-p-ripple tw-p-3 tw-flex tw-items-center tw-justify-between tw-text-600 tw-cursor-pointer hover:tw-bg-gray-200 tw-transition-colors tw-duration-200"
                >
                  <span className="tw-font-medium">{item.title}</span>
                  {item.children && item.children.length > 0 && <i
                    className={`pi pi-chevron-down tw-transition-transform tw-duration-300 ${expandedMenus[index] ? "tw-rotate-180" : ""
                      }`}
                  ></i>}
                  <Ripple />
                </div>
                <ul
                  className={`tw-list-none tw-p-0 tw-m-0 tw-overflow-hidden tw-transition-max-height tw-duration-300 ${expandedMenus[index] ? "tw-max-h-40" : "tw-max-h-0"
                    }`}
                >
                  {item?.children?.map((child, childIndex) => (
                    <li key={childIndex}>
                      <div
                        onClick={() => handleMenuItemClick(child?.path)}
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
  );
};

export default MySideBar;
