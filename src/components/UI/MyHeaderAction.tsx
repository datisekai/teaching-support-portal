import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { memo, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCommonStore } from "../../stores";
import { IAction } from "../../stores/commonStore";

const MyHeaderAction = () => {
  const {
    header: { actions },
  } = useCommonStore();
  const navigate = useNavigate();
  const menuRight = useRef<Menu>(null);

  const getIcon = (action: IAction) => {
    if (!action.icon) return undefined;
    switch (action.action) {
      case "back":
        return "pi pi-arrow-left";
    }

    return `${action.icon}`;
  };

  const handleClick = (action: IAction) => {
    switch (action.action) {
      case "back":
        return () => navigate(-1);
    }

    return action.onClick;
  };

  const items = useMemo(() => {
    let dropdown = [
      {
        label: "Hành động",
        items: actions.map((action) => ({
          label: action.title,
          icon: getIcon(action),
          command: handleClick(action),
        })),
      },
    ];
    return dropdown;
  }, [actions]);

  return (
    <>
      <div className="tw-hidden md:tw-flex tw-flex-1 tw-w-full tw-gap-2 tw-justify-end tw-items-center">
        {actions.map((action, index) => (
          <Button
            loading={action.loading}
            disabled={action.disabled}
            key={index}
            severity={action.severity}
            onClick={handleClick(action)}
            label={action.title}
            iconPos={action.iconPos || "left"}
            icon={getIcon(action)}
          />
        ))}
      </div>
      {actions && actions.length > 0 && (
        <div className="tw-flex md:tw-hidden tw-flex-1 tw-justify-end">
          <Menu
            model={items}
            popup
            ref={menuRight}
            id="popup_menu_right"
            popupAlignment="right"
            aria-hidden="false"
          />
          <Button
            label="Hành động"
            icon="pi pi-angle-down"
            className="mr-2"
            onClick={(event) => menuRight?.current?.toggle(event)}
            aria-controls="popup_menu_right"
            aria-haspopup
          />
        </div>
      )}
    </>
  );
};

export default memo(MyHeaderAction);
