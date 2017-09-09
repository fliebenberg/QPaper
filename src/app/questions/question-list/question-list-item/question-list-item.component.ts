import { Component, OnInit, Input , Output, EventEmitter} from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import * as SQActions from "../../../store/selected-question.actions";
import { Router } from "@angular/router";

import { Question } from "../../../store/question.model";
import { QuestionsService } from "../../questions.service";

@Component({
  selector: 'app-question-list-item',
  templateUrl: './question-list-item.component.html',
  styleUrls: ['./question-list-item.component.css']
})
export class QuestionListItemComponent implements OnInit {
  @Input() question: Question;
  @Input() index: number;

  constructor(
    private questionsService : QuestionsService,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit() {
  }

  questionSelected(){
    this.questionsService.setSelectedQuestion(this.question.id);
  }

  onEdit() {
    console.log("Question " + this.index + " was edited!")
  }
  onDelete() {
    console.log("Question " + this.index + " was deleted!");
    // this.questionsService.removeQuestion(this.index);
  }

}
