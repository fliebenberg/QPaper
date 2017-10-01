import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import { MdListModule, MdButtonModule } from "@angular/material";

import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.state";
import { Question } from '../../store/question.model';
import * as QActions from "../../store/questions.actions";
import { QuestionsService } from '../questions.service';

// interface AppState {
//   questions: Question[];
// }

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit, OnDestroy {
  questions$: Observable<Question[]>;
  gradeFilterValue: string = "ALL";
  subjectFilterValue: string = "ALL";
  topicFilterValue: string = "ALL";
  categoryFilterValue: string = "ALL";

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
  }

  onGradeSelectionChange() {
    if (this.gradeFilterValue !== "ALL") {
      this.subjectFilterValue = "ALL"
      this.topicFilterValue = "ALL"
      this.categoryFilterValue = "ALL"

    };
  }

  onSubjectSelectionChange() {
    if (this.subjectFilterValue !== "ALL") {
      this.topicFilterValue = "ALL"
      this.categoryFilterValue = "ALL"
    };
  }

  onTopicSelectionChange() {
    if (this.topicFilterValue !== "ALL") {
      this.categoryFilterValue = "ALL"
    };
  }

  ngOnDestroy() {
    // this.myQuestionsChangedSub.unsubscribe();
  }

}
