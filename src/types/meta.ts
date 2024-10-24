import { IClass } from "./class";
import { IFaculty } from "./faculty";
import { IUser } from "./user";

export interface IMeta {
  id: number;
  key: string;
  value: any;
  createdAt: string;
  updatedAt: string;
}
