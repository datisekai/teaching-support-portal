import { IClass } from "./class";

export interface IChoice {
  text: string;
  isCorrect: boolean;
}

export interface IQuestion {
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  id: number;
  title: string;
  content: string;
  type: "multiple_choice" | "code"; // Add any other possible types
  isPublic: boolean;
  choices: IChoice[]; // Array of choices for questions like multiple choice
  acceptedLanguages: string[]; // Array of accepted programming languages
  initCode: Record<string, any>; // Flexible object for initial code settings
  difficulty: { id: number; level: string };
  chapter: { id: number; name: string };
}
