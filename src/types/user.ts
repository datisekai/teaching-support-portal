export interface IUser {
  id: number;
  code: string;
  email: string;
  phone: any;
  active: boolean;
  name: string;
  avatar: any;
  deviceUid: any;
  type: string;
  createdAt: string;
  updatedAt: string;
  role: IRole;
}

export interface IRole {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  permissions: IPermission[];
}

export interface IPermission {
  id: number;
  action: string;
  resource: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISearchUser {
  code: string;
  name: string;
  avatar?: string;
}
