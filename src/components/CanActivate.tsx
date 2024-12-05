import React from "react";
import { useUserStore } from "../stores/userStore";

type Props = {
  permission: string;
  children: React.ReactNode;
};

const CanActivate: React.FC<Props> = ({ permission, children }) => {
  const { permissions } = useUserStore();
  return <>{permissions.includes(permission) ? children : null}</>;
};

export default CanActivate;
