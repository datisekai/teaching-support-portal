export interface IAttendance {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  title: string;
  isOpen: boolean;
  secretKey: string;
  class: Class;
  user: User;
  attendees: Attendee[];
}

export interface Attendee {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  isSuccess: boolean;
}

export interface Class {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  name: string;
  major: Major;
  teachers: User[];
}

export interface Major {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  code: string;
  name: string;
}

export interface User {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  code: string;
  email: null;
  phone: null;
  active: boolean;
  name: string;
  avatar: null;
  deviceUid: null;
  type: string;
}
