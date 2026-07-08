import { Question } from './question.model';

export interface Survey {
  id?: number;
  title: string;
  description: string;
  questions: Question[];
}

