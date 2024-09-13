import React, { ReactNode } from "react";

interface CardProps {
  title: string;
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
    <div className={`border rounded-lg shadow-md p-4 bg-white ${className}`}>
      <div className="mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        {description && <p className="text-gray-600">{description}</p>}
      </div>
      <div className="mb-4">{children}</div>
      {footer && <div className="border-t pt-4">{footer}</div>}
    </div>
  );
};

export default MyCard;
