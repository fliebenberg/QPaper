import { Action } from "@ngrx/Store";
import { Question } from "./question.model";

export interface CustomAction extends Action {
  type: string;
  payload?: any;
}

export interface AppState {
  questions: Question[],
  selectedQuestion : Question;
}

export const INITIAL_STATE = {
  questions: [],
  selectedQuestion : null
}
