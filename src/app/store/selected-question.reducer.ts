import { Injectable } from "@angular/core";
import { CustomAction } from "./app.state";

import { Question } from "./question.model";
import * as Actions from "./selected-question.actions";

export function selectedQuestionReducer(state: Question[] = [], action: CustomAction){
  switch (action.type){
    case Actions.SET: {
      if (action.payload) {
        console.log("selectedQuestion set to " + action.payload.id)
      } else {
        console.log("selectedQuestion undefined.")
      };
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
