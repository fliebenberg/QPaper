import { Action } from "@ngrx/store";
import { CustomAction } from "./app.state";
import { Question } from "./question.model";

export const SET = "[Selected-Question] Set";

export class SetAction implements CustomAction {
  readonly type = SET;
  constructor(public payload: Question) {};
}

export type All =
  SetAction;
