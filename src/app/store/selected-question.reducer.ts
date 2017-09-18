import { Injectable } from "@angular/core";
import { CustomAction } from "./app.state";

import { Question } from "./question.model";
import * as Actions from "./selected-question.actions";

export function selectedQuestionReducer(state: Question = null, action: CustomAction){
  switch (action.type){
    case Actions.SET: {
      if (action.payload != null && action.payload.id) {
        console.log("selectedQuestion set to " + action.payload.id)
        return action.payload;
      } else {
        console.log("selectedQuestion undefined.")
        return null;
      };
    }
    default: {
      return state;
    }
  }
}
