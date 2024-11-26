import { IClass } from "./class";
import { IExamQuestion } from "./examQuestion";

export interface IExam {
  id: number;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  class: IClass;
  questions: any;
  showResult: boolean;
  examQuestions: IExamQuestion[];
  duration: number;
  blockControlCVX: boolean;
  blockMouseRight: boolean;
  logOutTab: boolean;
  isLink: boolean;
}
