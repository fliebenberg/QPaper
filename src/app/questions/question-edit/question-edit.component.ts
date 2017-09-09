import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs/subscription";
import { MdButtonModule } from "@angular/material";

import { Question } from "../../store/question.model";
import { QuestionsService } from "../questions.service";

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {
  id: string;
  questionCopy : Question;
  questionSubscription : Subscription;
  showMetaData = false;
  // myQuestionChangeSub : Subscription;

  constructor(private route: ActivatedRoute,
              private router : Router,
              private questionsService : QuestionsService
            ) {
  }

  ngOnInit() {
    console.log("question-edit.component initialising...")
    this.id = this.route.snapshot.params['id'];
    console.log("route id: "+this.id);
    if (this.questionsService.setSelectedQuestion(this.id)) {
      this.questionCopy = this.questionsService.getQuestionSnapshot(this.id);
      // subscribe to monitor when params change and load new question
      this.route.params
      .subscribe(
        (params: Params) => {
          console.log("Subscribing to params");
          this.id = params['id'];
          if (this.questionsService.setSelectedQuestion(this.id)) {
            this.questionCopy = this.questionsService.getQuestionSnapshot(this.id);
          } else {
            console.log("Invalid id in params :" + this.id);
            this.router.navigate(["/questions"]);
          };
        }
      );

      console.log("Question Edit Init: ");
      console.log(this.questionCopy);
    } else {
      console.log("could not find question with id: "+ this.id);
      this.router.navigate(["/questions"]);
    };
  }

  formSubmit(form: NgForm){
    this.questionCopy.description = form.value.description;
    this.questionCopy.questionText = form.value.questionText;
    this.questionCopy.answerText = form.value.answerText;
    this.questionsService.replaceQuestion(this.questionCopy);
    this.router.navigate(["/questions",this.questionCopy.id]);
  }

  onDelete(index: number) {

    // this.questionsService.removeQuestion(this.index);
    console.log("Question "+this.id+" deleted.");
  }

  onToggleMetaData() {
    this.showMetaData = !this.showMetaData;
  }
}
