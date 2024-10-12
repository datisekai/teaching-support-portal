import { IMajor } from "./major";
import { IUser } from "./user";

export interface IClass {
  id: number;
  name: string;
  major: IMajor[];
  teacher: IUser[];
  createdAt: string;
  updatedAt: string;
}
