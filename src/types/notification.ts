import { IClass } from "./class";
import { IFaculty } from "./faculty";
import { IUser } from "./user";

export interface INotification {
  id: number;
  name: string;
  image: string;
  content: string;
  classes: IClass[];
  createdAt: string;
  updatedAt: string;
}
