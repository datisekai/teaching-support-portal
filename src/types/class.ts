import { IMajor } from "./major";
import { IUser } from "./user";

export interface IClass {
  id: number;
  name: string;
  major: IMajor;
  duration: string;
  teachers: IUser[];
  users: IUser[];
  createdAt: string;
  updatedAt: string;
}
