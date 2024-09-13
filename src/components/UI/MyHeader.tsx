import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import React, { useRef } from "react";

interface IAction {
  title: string;
  icon: string;
  onClick: () => void;
  type: "button" | "file";
  disabled: boolean;
}
interface IMyHeader {
  isSidebarVisible: boolean;
  dataActions: MenuItem[];
  renderActionsMobile: () => JSX.Element[];
  header: {
    title: string;
    actions: IAction[];
  };
  isMobile: boolean;
  toggleSidebar: () => void;
}
const MyHeader: React.FC<IMyHeader> = ({
  isSidebarVisible,
  dataActions,
  renderActionsMobile,
  header,
  isMobile,
  toggleSidebar,
}) => {
  const menuRight = useRef<Menu | null>(null);

  return (
    <header
      className={`tw-bg-gray-100 tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-flex tw-justify-between tw-items-center tw-p-2 tw-shadow-md tw-z-10 tw-transition-all tw-duration-300 ${
        isSidebarVisible ? "md:tw-ml-80" : "md:tw-ml-0"
      }`}
    >
      <div className="tw-flex tw-items-center tw-gap-4 tw-min-h-16 tw-ml-2">
        <Button icon="pi pi-bars" onClick={toggleSidebar} />
        <div>{header.title}</div>
      </div>
      {isMobile && dataActions.length > 0 ? (
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
        <div className="tw-flex tw-items-center tw-justify-center tw-gap-2 tw-mr-2">
          {renderActionsMobile()}
        </div>
      )}
    </header>
  );
};

export default MyHeader;
