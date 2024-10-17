import { IFaculty } from "./faculty";
import { IUser } from "./user";

export interface INotification {
  id: number;
  name: string;
  image: string;
  content: string;
  classId: string;
  createdAt: string;
  updatedAt: string;
}
