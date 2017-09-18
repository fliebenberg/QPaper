import { Action } from "@ngrx/Store";
import { Question } from "./question.model";

export interface CustomAction extends Action {
  type: string;
  payload?: any;
}

export interface AppState {
  questions: Question[],
  grades: string[],
  subjects: string[],
  topics: string[],
  categories: string[],
  selectedQuestion : Question;
}

export const INITIAL_STATE = {
  questions: [],
  grades: [],
  subjects: [],
  topics: [],
  categories: [],
  selectedQuestion : null
}
