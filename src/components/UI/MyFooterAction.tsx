import React, { act, memo, useMemo } from "react";
import { useCommonStore } from "../../stores";
import { Button } from "primereact/button";
import { IAction } from "../../stores/commonStore";
import { useNavigate } from "react-router-dom";

interface IMyFooterAction {
  isSidebarVisible: boolean;
}
const MyFooterAction: React.FC<IMyFooterAction> = ({ isSidebarVisible }) => {
  const actions = useCommonStore((state) => state.footer.actions);
  const isLoadingApi = useCommonStore((state) => state.isLoadingApi);
  const navigate = useNavigate();

  const getIcon = (action: IAction) => {
    switch (action.action) {
      case "back":
        return "pi pi-arrow-left";
    }

    return `pi ${action.icon}`;
  };

  const handleClick = (action: IAction) => {
    switch (action.action) {
      case "back":
        return () => navigate(-1);
    }

    return action.onClick;
  };

  return (
    <footer
      className={`tw-bg-gray-100  tw-fixed tw-bottom-0 tw-left-0 tw-right-0 tw-flex tw-justify-between tw-items-center tw-px-4 tw-py-2 tw-shadow-md tw-z-10 tw-transition-all tw-duration-300 ${
        isSidebarVisible ? "md:tw-ml-80" : "md:tw-ml-0"
      }`}
    >
      <div className="tw-w-full tw-flex tw-gap-2 tw-justify-end tw-items-center">
        {actions.map((action, index) => (
          <Button
            loading={action.loading || isLoadingApi}
            disabled={action.disabled || isLoadingApi}
            key={index}
            severity={action.severity}
            onClick={handleClick(action)}
            label={action.title}
            iconPos={action.iconPos || "left"}
            icon={getIcon(action)}
          />
        ))}
      </div>
    </footer>
  );
};

export default memo(MyFooterAction);
