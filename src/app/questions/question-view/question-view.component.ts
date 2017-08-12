import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from "@angular/router";
import { Subscription } from "rxjs/subscription";

import { Question } from "../question.model";
import { QuestionsService } from "../questions.service";

@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.css']
})
export class QuestionViewComponent implements OnInit {
  index: number;
  question : Question;
  myQuestionChangeSub : Subscription;

  constructor(private route: ActivatedRoute,
              private router : Router,
              private questionsService : QuestionsService) {
  }

  ngOnInit() {
    this.index = +this.route.snapshot.params['index'];
    this.question = this.questionsService.getQuestion(this.index);
    this.route.params
      .subscribe(
        (params: Params) => {
          this.index = +params['index'];
          this.question = this.questionsService.getQuestion(this.index);
        }
      );
    this.myQuestionChangeSub = this.questionsService.questionsChanged.subscribe(
      (questions : Question[]) => {
        this.router.navigate(['/questions']);
      }
    );
  }

  onDelete(index: number) {
    
    this.questionsService.removeQuestion(this.index);
    console.log("Question "+this.index+" deleted.");
  }
}
