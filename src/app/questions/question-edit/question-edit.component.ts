import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from "@angular/router";
import { NgForm, FormGroup, FormControl } from "@angular/forms";
import { Subscription } from "rxjs/subscription";
// import { MdButtonModule } from "@angular/material";

// import { QuestionVarsComponent } from "../question-vars/question-vars.component";
// import { QuestionMetaComponent } from "../question-meta/question-meta.component";
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

  questionEditForm : FormGroup;

  constructor(private route: ActivatedRoute,
              private router : Router,
              private questionsService : QuestionsService
            ) {
  }

  ngOnInit() {
    console.log("question-edit.component initialising...")
    this.id = this.route.snapshot.params['id'];

    if (this.questionsService.setSelectedQuestion(this.id)) {
      this.questionCopy = this.questionsService.getQuestionSnapshot(this.id);
      // this.route.params.subscribe(
      //   (params: Params) => {
      //     this.id = params['id'];
      //     if (this.questionsService.setSelectedQuestion(this.id)) {
      //       this.questionCopy = this.questionsService.getQuestionSnapshot(this.id);
      //     } else {
      //       console.log("Invalid id in params :" + this.id);
      //       this.router.navigate(["/questions"]);
      //     };
      //   }
      // );
    } else {
      console.log("Could not edit question with id: "+ this.id);
      this.questionCopy = new Question();
      this.router.navigate(["/questions"]);
    };
    this.formInit();
    console.log(this.questionEditForm);
  }

  formSubmit(){
    this.questionCopy.description = this.questionEditForm.value.description;
    this.questionCopy.questionText = this.questionEditForm.value.questionText;
    this.questionCopy.answerText = this.questionEditForm.value.answerText;
    console.log("Saving edited question...");
    console.log(this.questionCopy);
    this.questionsService.replaceQuestion(this.questionCopy);
    this.router.navigate(["/questions",this.questionCopy.id]);
  }

  onCancel(){
    this.router.navigate(["/questions",this.questionCopy.id]);
  };

  onReset(){
    this.questionCopy = this.questionsService.getQuestionSnapshot(this.id);
    console.log("Question editor reset");
  }

  onDelete(index: number) {

    // this.questionsService.removeQuestion(this.index);
    console.log("Question "+this.id+" deleted.");
  }

  makeFormDirty() {
    console.log("Form is now dirty...");
    this.questionEditForm.markAsDirty();
  }

  formInit(){
    this.questionEditForm = new FormGroup({
      'grade': new FormControl(this.questionCopy.grade),
      'subject': new FormControl(this.questionCopy.subject),
      'topic': new FormControl(this.questionCopy.topic),
      'category': new FormControl(this.questionCopy.category),
      'description': new FormControl(this.questionCopy.description),
      'questionText': new FormControl(this.questionCopy.questionText),
      'answerText': new FormControl(this.questionCopy.answerText),
    });

  }

}
