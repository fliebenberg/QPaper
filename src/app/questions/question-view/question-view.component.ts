import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from "@angular/router";
import { Subscription } from "rxjs/subscription";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.state";

import { Question } from "../../store/question.model";
import { QuestionsService } from "../questions.service";

@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.css']
})
export class QuestionViewComponent implements OnInit, OnDestroy {
  id: string;
  question$ : Observable<Question>;
  questionSubscription : Subscription;
  questionSnapshot : Question = new Question();

  constructor(private route: ActivatedRoute,
              private router : Router,
              private store: Store<AppState>,
              private questionsService : QuestionsService
            ) {

  }

  ngOnInit() {
    console.log("question-view.component initialising...")
    this.id = this.route.snapshot.params['id'];
    console.log("route id: "+this.id);
    if (this.questionsService.setSelectedQuestion(this.id)) {
      this.question$ = this.questionsService.getSelectedQuestion();
      // subscribe to monitor when params change and load new question
      this.route.params
      .subscribe(
        (params: Params) => {
          console.log("Subscribing to params");
          this.id = params['id'];
          this.questionsService.setSelectedQuestion(this.id);
          this.question$ = this.questionsService.getSelectedQuestion();
        }
      );

      console.log("Question View Init: ");
      this.questionSubscription = this.question$.subscribe((q) => {
        this.questionSnapshot = q;
      });
      console.log(this.questionSnapshot);
    } else {
      console.log("could not find question with id: "+ this.id);
      this.router.navigate(["/questions"]);
    };
  }

  onDelete() {

    console.log("Question "+this.questionSnapshot.description+" deleted.");
    this.questionsService.deleteQuestion(this.questionSnapshot);
    this.router.navigate(['/questions']);
    // this.questionsService.removeQuestion(this.index);

  }

  ngOnDestroy() {
    if (this.questionSubscription) {this.questionSubscription.unsubscribe()};
  }
}
