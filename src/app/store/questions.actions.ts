import { Action } from "@ngrx/store";
import { CustomAction } from "./app.state";
import { Question } from "./question.model";

export const LOAD = "[Questions] Load";
export const ADD = "[Questions] Add";
export const DELETE = "[Questions] Delete";
export const REPLACE = "[Questions] Replace";

export class LoadAction implements CustomAction {
  readonly type = LOAD;
  constructor(public payload: Question[]) {};
}

export class AddAction implements CustomAction {
  readonly type = ADD;
  constructor(public payload: Question) {};
}

export class DeleteAction implements CustomAction {
  readonly type = DELETE;
  constructor(public payload: Question) {};
}

export class ReplaceAction implements CustomAction {
  readonly type = REPLACE;
  constructor(public payload: Question) {};
}

export type All =
  LoadAction |
  AddAction |
  DeleteAction |
  ReplaceAction;
