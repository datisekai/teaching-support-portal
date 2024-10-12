import { ProgressSpinner } from "primereact/progressspinner";
import React from "react";

interface IProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const MyLoading: React.FC<IProps> = ({ isLoading, children }) => {
  return (
    <div>
      {isLoading ? (
        <div className="tw-flex tw-items-center tw-justify-center">
          <ProgressSpinner className="tw-mt-10" />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default MyLoading;
