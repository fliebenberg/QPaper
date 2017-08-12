import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs/subscription";
import { MdButtonModule } from "@angular/material";

import { Question } from "../question.model";
import { QuestionsService } from "../questions.service";

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {
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
    console.log(this.question);
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

  formSubmit(form: NgForm){
    this.question.description = form.value.description;
    this.question.questionText = form.value.questionText;
    this.question.answerText = form.value.answerText;

    this.questionsService.replaceQuestion(this.index, this.question);
  }

  onDelete(index: number) {

    this.questionsService.removeQuestion(this.index);
    console.log("Question "+this.index+" deleted.");
  }

}
