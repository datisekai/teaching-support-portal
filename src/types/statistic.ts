export interface IStatistic {
  teachingClassesCount: number;
  openExamsCount: number;
  pendingLettersCount: number;
  pendingLetters: PendingLetter[];
}

interface PendingLetter {
  createdAt: string;
  updatedAt: string;
  id: number;
  type: string;
  image: string;
  time: string;
  reason: string;
  status: string;
  class: Class;
  user: { code: string; name: string };
}

interface Class {
  name: string;
  major: Major;
  teachers: Teacher[];
}

interface Major {
  code: string;
  name: string;
}

interface Teacher {
  code: string;
  name: string;
}
