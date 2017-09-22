import { Action } from "@ngrx/store";
import { CustomAction } from "./app.state";
import { Question } from "./question.model";

export const LOAD = "[Questions] Load";
export const ADD = "[Questions] Add";
export const DELETE = "[Questions] Delete";
export const REPLACE = "[Questions] Replace";

export class Load implements Action {
  readonly type = LOAD;
  constructor(public payload: Question[]) {};
}

export class Add implements Action {
  readonly type = ADD;
  constructor(public payload: Question) {};
}

export class Delete implements Action {
  readonly type = DELETE;
  constructor(public payload: Question) {};
}

export class Replace implements Action {
  readonly type = REPLACE;
  constructor(public payload: Question) {};
}

export type All = Load | Add | Delete | Replace;
