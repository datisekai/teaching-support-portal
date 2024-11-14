import { IClass } from "./class";
import { IQuestion } from "./question";

export interface IExamQuestion {
  id: number;
  score: number;
  createdAt: Date;
  updatedAt: Date;
  question: IQuestion;
}
