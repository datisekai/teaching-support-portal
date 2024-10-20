import { useContext } from "react";
import { ToastContext } from "../layouts/ToastProvider";
import { useSearchParams } from "react-router-dom";

interface IProps {
  key: string;
  defaultValue?: string;
}
export const useQuery = ({ key, defaultValue = "" }: IProps) => {
  let [searchParams, setSearchParams] = useSearchParams();

  return [
    searchParams.get(key) || defaultValue,
    (value: string) => {
      setSearchParams({ [key]: value }, { replace: true });
    },
  ];
};
