import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import React, { ReactNode } from "react";
import { randomString } from "../../utils";
import { IAction } from "../../stores/commonStore";

interface CardProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
  tooltip?: React.ReactNode
  action?: IAction
  containerClassName?: string
}
const MyCard: React.FC<CardProps> = ({
  title,
  description,
  children,
  footer,
  className,
  tooltip, action,
  containerClassName = ''
}) => {
  const randomID = "tooltip-card"
  return (
    <div className={`tw-border tw-shadow-md tw-rounded-lg tw-p-4 tw-bg-white ${containerClassName}`}>
      <div className="tw-mb-4">
        <div className="tw-flex tw-items-center tw-justify-between">
          <div className="tw-flex tw-gap-1 tw-items-center">
            {title && <h2 className="tw-text-xl tw-font-bold">{title}</h2>}
            {tooltip && <i className={`pi pi-question-circle ${randomID}`}></i>}
          </div>
          {action && <Button icon={action.icon} label={action.title} disabled={action.disabled} onClick={action.onClick} />}

        </div>
        {description && <p className="tw-text-gray-600">{description}</p>}
      </div>
      <div className={`tw-mb-4 ${className || ''}`}>{children}</div>
      {footer && <div className="tw-border-t tw-pt-4">{footer}</div>}

      {tooltip && <>
        <Tooltip target={`.${randomID}`}>
          {tooltip}</Tooltip></>}
    </div>
  );
};

export default React.memo(MyCard);
