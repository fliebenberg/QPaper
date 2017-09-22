import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from "@angular/router";
import { NgForm, FormGroup, FormControl, FormArray } from "@angular/forms";
import { Subscription } from "rxjs/subscription";

import { Question } from "../../store/question.model";
import { QuestionVar } from "../../store/question-var.model";
import { QuestionsService } from "../questions.service";

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {
  id: string;
  newQuestion : boolean = false;
  questionCopy : Question;
  questionSubscription : Subscription;
  selectedVar : number;

  questionEditForm : FormGroup;

  constructor(private route: ActivatedRoute,
              private router : Router,
              private questionsService : QuestionsService
            ) {
  }

  ngOnInit() {
    console.log("question-edit.component initialising...")
    this.id = this.route.snapshot.params['id'];
    if (this.id == "NEW") {
      console.log("NEW question edit");
      console.log(this.id);
      this.newQuestion = true;
      this.questionCopy = new Question(this.questionsService.getNewQuestionId());
    } else
    if (this.questionsService.setSelectedQuestion(this.id)) {
      console.log("Existing question edit");
      this.questionCopy = this.questionsService.getQuestionSnapshot(this.id);
      console.log(this.selectedVar);
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
    if (this.questionCopy.vars.length > 0) {
      this.selectedVar = 0;
    }
    this.formInit();
  }

  formSubmit(){
    this.questionCopy.description = this.questionEditForm.value.description;
    this.questionCopy.questionText = this.questionEditForm.value.questionText;
    this.questionCopy.answerText = this.questionEditForm.value.answerText;
    if (this.newQuestion) {
      console.log("Saving new question...");
      let newId: string = this.questionsService.addQuestion(this.questionCopy);
      this.questionCopy.id = newId;
    } else {
      console.log("Saving edited question...");
      this.questionsService.replaceQuestion(this.questionCopy);
    }
    console.log(this.questionCopy);
    this.router.navigate(["/question",this.questionCopy.id]);
  }

  onCancel(){
    if (this.newQuestion) {
      this.router.navigate(["/questions"]);
    } else {
      this.router.navigate(["/question",this.questionCopy.id]);
    }
  };

  onReset(){
    this.questionCopy = this.questionsService.getQuestionSnapshot(this.id);
    if (this.questionCopy.vars.length > 0) {
      this.selectedVar = 0;
    } else {
      this.selectedVar = undefined;
    }
    console.log("Question editor reset");
  }

  onDelete(index: number) {
    this.questionsService.deleteQuestion(this.questionCopy);
    console.log("Question "+this.questionCopy.id+" deleted.");
  }

  // makeFormDirty() {
  //   console.log("Form is now dirty...");
  //   this.questionEditForm.markAsDirty();
  // }

  formInit(){
    console.log("init form...")
    this.questionEditForm = new FormGroup({
      "grade": new FormControl(this.questionCopy.grade),
      "subject": new FormControl(this.questionCopy.subject),
      "topic": new FormControl(this.questionCopy.topic),
      "category": new FormControl(this.questionCopy.category),
      "description": new FormControl(this.questionCopy.description),
      "questionText": new FormControl(this.questionCopy.questionText),
      "answerText": new FormControl(this.questionCopy.answerText),
    });
    if (this.selectedVar > -1) {
      this.createVarForm();
    }
    console.log(this.questionEditForm);
  }

  onNewVar(){
    console.log("Creating new question variable.");
    this.questionCopy.vars = [...this.questionCopy.vars,new QuestionVar("Fred New Var")];
    // console.log(this.questionCopy.vars);
    this.selectedVar = this.questionCopy.vars.length-1;
    if (this.selectedVar == 0) {
      this.createVarForm();
    }
    this.populateVarForm();
    this.questionEditForm.markAsDirty();
    // this.makeFormDirty();
  }

  onVarSelected(id: number){
    console.log("Selected question variable no: " + id);
    this.selectedVar = id;
    this.populateVarForm();
  }

  saveVarChanges() {
    this.questionCopy.vars[this.selectedVar] = {
      ...this.questionCopy.vars[this.selectedVar],
      name: this.questionEditForm.get("vars.name").value,
      defaultVal: this.questionEditForm.get("vars.defaultVal").value,
      specifiedVal: this.questionEditForm.get("vars.specifiedVal").value
    };
    this.questionEditForm.get("vars").markAsPristine();
    this.questionEditForm.markAsDirty();
    // this.makeFormDirty();
  }

  createVarForm() {
    this.questionEditForm.addControl("vars", new FormGroup({
      "name": new FormControl(this.questionCopy.vars[this.selectedVar].name),
      "defaultVal": new FormControl(this.questionCopy.vars[this.selectedVar].defaultVal),
      "specifiedVal": new FormControl(this.questionCopy.vars[this.selectedVar].specifiedVal)
    }));
  }
  populateVarForm() {
    this.questionEditForm.get("vars.name").setValue(this.questionCopy.vars[this.selectedVar].name);
    this.questionEditForm.get("vars.defaultVal").setValue(this.questionCopy.vars[this.selectedVar].defaultVal);
    this.questionEditForm.get("vars.specifiedVal").setValue(this.questionCopy.vars[this.selectedVar].specifiedVal);
  }
}
