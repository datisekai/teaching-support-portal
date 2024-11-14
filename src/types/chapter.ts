import { IMajor } from "./major";

export interface IChapter {
  id: number;
  name: string;
  major: IMajor;
  created: Date;
  updated: Date;
}
