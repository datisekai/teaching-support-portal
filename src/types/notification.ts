import { IClass } from "./class";
import { IFaculty } from "./faculty";
import { IUser } from "./user";

export interface INotification {
  id: number;
  name: string;
  image: string;
  content: string;
  class: IClass;
  createdAt: string;
  updatedAt: string;
}
