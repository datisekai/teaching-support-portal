export interface IAttendance {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  title: string;
  isOpen: boolean;
  class: Class;
  user: User;
  secretKey: string;
}

export interface Class {
  id: number;
  name: string;
  major: Major;
  teachers: User[];
}

export interface Major {
  id: number;
  code: string;
  name: string;
}

export interface User {
  code: string;
  name: string;
}
