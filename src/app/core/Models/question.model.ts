export interface Question {
  id?: number;
  title: string;
  type: QuestionType;
  required: boolean;
  options: string[];
}

export enum QuestionType {
  MULTIPLE = 'MULTIPLE',
  TEXT = 'TEXT',
  CHECKBOX = 'CHECKBOX'
  //   RATING = 'RATING',
}