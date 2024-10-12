import { IFaculty } from "./faculty";
import { IUser } from "./user";

export interface IMajor {
  id: number;
  name: string;
  code: number;
  faculty: IFaculty;
  teachers: IUser[];
  createdAt: string;
  updatedAt: string;
}
