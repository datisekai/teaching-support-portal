import { IClass } from "./class";
import { IFaculty } from "./faculty";
import { IUser } from "./user";

export interface ILetter {
  id: number;
  name: string;
  image: string;
  content: string;
  class: IClass;
  user: IUser;
  createdAt: string;
  updatedAt: string;
}
