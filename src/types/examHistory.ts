export interface IExamHistory {
  submissions: Submission[];
  showResult: boolean;
}

interface Submission {
  id: number;
  languageId: any;
  code: any;
  answer: string;
  questionTemp: QuestionTemp;
  examQuestion: ExamQuestion;
}

interface QuestionTemp {
  createdAt: string;
  updatedAt: string;
  id: number;
  title: string;
  content: string;
  type: string;
  isPublic: boolean;
  choices: Choice[];
  acceptedLanguages?: any[];
  initCode: InitCode;
  isDeleted: boolean;
  testCases: any[];
}

interface Choice {
  text: string;
}

interface InitCode {}

interface ExamQuestion {
  id: number;
}
