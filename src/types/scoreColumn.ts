import { IClass } from "./class";
import { IFaculty } from "./faculty";
import { IMajor } from "./major";
import { IStudentScore } from "./studentScore";
import { IUser } from "./user";

export interface IScoreColumn {
  id: number;

  name: string; // Tên cột điểm (Ví dụ: "Điểm giữa kỳ", "Điểm cuối kỳ")

  weight: number; // Trọng số của cột điểm

  class: IClass; // Cột điểm thuộc về lớp nào
  major: IMajor;

  scores: IStudentScore[];
  createdAt: string;
  updatedAt: string;
}
