import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import { MdListModule, MdButtonModule } from "@angular/material";

import { Store } from "@ngrx/store";
import { Question } from '../../store/question.model';
import * as QActions from "../../store/questions.actions";
import { QuestionsService } from '../questions.service';

interface AppState {
  questions: Question[];
}

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit, OnDestroy {
  questions$: Observable<Question[]>;
  // private myQuestionsChangedSub: Subscription;

  constructor(
    private store: Store<AppState>,
    private questionsService: QuestionsService,
    private router : Router
  ) {
    this.questions$ = this.store.select("questions");
  }

  ngOnInit() {
    console.log(this.questionsService.grades$)
  }

  onAddQuestion() {
    this.router.navigate(["/question", "NEW", "edit"]);
    // this.questionsService.addQuestion(new Question('3', 'Grade6', 'Maths', 'More advanced maths','','Dificult math question', 'What is 100+100?', 'Answer is 200'));
    // this.questionsService.addQuestion(
    //   new Question('3', 'Grade6', 'Maths', 'More advanced maths','','Dificult math question', 'What is 100+100?', 'Answer is 200')
    // )
  }

  onDeleteQuestion() {
    // this.questionsService.removeQuestion(0);
  }

  ngOnDestroy() {
    // this.myQuestionsChangedSub.unsubscribe();
  }

}
