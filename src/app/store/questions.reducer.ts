import { CustomAction, INITIAL_STATE } from "./app.state";

import { Question } from "./question.model";
import * as QActions from "./questions.actions";

export function questionsReducer(state: Question[] = INITIAL_STATE.questions, action: CustomAction){
  switch (action.type){
    case QActions.LOAD: {
      return action.payload;
    }
    case QActions.ADD: {
      return [...state, action.payload];
    }
    case QActions.DELETE: {
      console.log("Starting delete...");
      console.log(action.payload);
      return state.filter(
        question => {
          console.log("Comparing...")
          console.log(question);
          if (question.id !== action.payload.id) {
            console.log("pass");
            return true;
          } else {
            console.log("fail");
            return false;
          };
        }
      );
    }
    case QActions.REPLACE: {
      console.log("Starting replace...");
      console.log(action.payload);
      return state.map(
        question => {
          console.log("Comparing...")
          console.log(question);
          if (question.id == action.payload.id) {
            console.log("change");
            return action.payload;
          } else {
            console.log("stay the same");
            return question;
          };
        }
      );
    }
    default: {
      return state;
    }
  }
}
