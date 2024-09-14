import React, { ReactNode } from "react";

interface CardProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
}
const MyCard: React.FC<CardProps> = ({
  title,
  description,
  children,
  footer,
  className,
}) => {
  return (
    <div className={`tw-border tw-shadow-md tw-rounded-lg tw-p-4 tw-bg-white `}>
      <div className="tw-mb-4">
        {title && <h2 className="tw-text-xl tw-font-bold">{title}</h2>}
        {description && <p className="tw-text-gray-600">{description}</p>}
      </div>
      <div className={`tw-mb-4 ${className}`}>{children}</div>
      {footer && <div className="tw-border-t tw-pt-4">{footer}</div>}
    </div>
  );
};

export default MyCard;
