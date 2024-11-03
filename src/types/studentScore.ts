import { IClass } from "./class";
import { IFaculty } from "./faculty";
import { IScoreColumn } from "./scoreColumn";
import { IUser } from "./user";

export interface IStudentScore {
  id: number;

  student: IUser; // Sinh viên

  scoreColumn: IScoreColumn; // Cột điểm

  score: number; // Điểm số
  createdAt: string;
  updatedAt: string;
}
