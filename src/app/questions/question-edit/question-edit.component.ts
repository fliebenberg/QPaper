import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from "@angular/router";
import { NgForm, FormGroup, FormControl, FormArray } from "@angular/forms";
import { MdDialog } from "@angular/material";
import { Subscription } from "rxjs/subscription";

import { Question } from "../../store/question.model";
import { QuestionVar } from "../../store/question-var.model";
import { QuestionsService } from "../questions.service";
import { ConfirmDialogComponent } from "../../shared/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit, OnDestroy {
  id: string;
  newQuestion : boolean = false;
  questionCopy : Question;
  varsCopy : QuestionVar[];
  selectedVar : number;
  varsDirty : boolean = false;
  addGrade : boolean = false;
  addSubject : boolean = false;
  addTopic : boolean = false;
  addCategory : boolean = false;

  questionEditForm : FormGroup;

  constructor(private route: ActivatedRoute,
              private router : Router,
              private questionsService : QuestionsService,
              private dialog : MdDialog
            ) {
  }

  ngOnInit() {
    console.log("question-edit.component initialising...");
    this.selectedVar = undefined;
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
    } else {
      console.log("Could not edit question with id: "+ this.id);
      this.questionCopy = new Question();
      this.router.navigate(["/questions"]);
    };
    this.varsCopy = [...this.questionCopy.vars];
    if (this.varsCopy.length > 0) {
      this.selectedVar = 0;
    }
    this.formInit();
  }

  formInit(){
    console.log("Init edit form...")
    this.questionEditForm = new FormGroup({
      "grade": new FormControl(this.questionCopy.grade),
      "newGrade": new FormControl(),
      "subject": new FormControl(this.questionCopy.subject),
      "newSubject": new FormControl(),
      "topic": new FormControl(this.questionCopy.topic),
      "newTopic": new FormControl(),
      "category": new FormControl(this.questionCopy.category),
      "newCategory": new FormControl(),
      "description": new FormControl(this.questionCopy.description),
      "questionText": new FormControl(this.questionCopy.questionText),
      "answerText": new FormControl(this.questionCopy.answerText),
    });
    console.log("Edit form initialised...");
    this.varsDirty = false;
    if (this.selectedVar > -1) {
      this.createVarForm();
    }
    console.log(this.questionEditForm);
  }

  formSubmit(){
    this.questionCopy.description = this.questionEditForm.value.description;
    if (this.addGrade) {
      this.questionCopy.grade = this.questionEditForm.value.newGrade;
    } else {
      this.questionCopy.grade = this.questionEditForm.value.grade;
    }
    if (this.addGrade || this.addSubject) {
      this.questionCopy.subject = this.questionEditForm.value.newSubject;
    } else {
      this.questionCopy.subject = this.questionEditForm.value.subject;
    }
    this.questionCopy.topic = this.questionEditForm.value.topic;
    this.questionCopy.category = this.questionEditForm.value.category;
    this.questionCopy.questionText = this.questionEditForm.value.questionText;
    this.questionCopy.answerText = this.questionEditForm.value.answerText;
    this.questionCopy.vars = [...this.varsCopy];
    if (this.newQuestion) {
      console.log("Saving new question...");
      let newId: string = this.questionsService.addQuestion(this.questionCopy);
      this.questionCopy.id = newId;
    } else {
      console.log("Saving edited question...");
      this.questionsService.replaceQuestion(this.questionCopy);
    }
    this.varsDirty = false;
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
    this.ngOnInit();
  }

  onGradeSelectionChange() {
    console.log("Selected grade:" + this.questionCopy.grade);
    if (this.questionCopy.grade == "***NEWGRADE") {
      this.addGrade = true;
    } else {
      this.addGrade = false;
    }
  }

  onSubjectSelectionChange() {
    console.log("Selected subject:" + this.questionCopy.subject);
    if (this.questionCopy.subject == "***NEWSUBJECT") {
      this.addSubject = true;
    } else {
      this.addSubject = false;
    }
  }

  onTopicSelectionChange() {
    console.log("Selected topic:" + this.questionCopy.topic);
    if (this.questionCopy.topic == "***NEWTOPIC") {
      this.addTopic = true;
    } else {
      this.addTopic = false;
    }
  }

  onCategorySelectionChange() {
    console.log("Selected category:" + this.questionCopy.category);
    if (this.questionCopy.category == "***NEWCATEGORY") {
      this.addCategory = true;
    } else {
      this.addCategory = false;
    }
  }

  onNewVar(){
    console.log("Creating new question variable.");
    this.varsDirty = true;
    this.varsCopy = [...this.varsCopy,new QuestionVar("Fred New Var")];
    // console.log(this.questionCopy.vars);
    this.selectedVar = this.varsCopy.length-1;
    if (this.selectedVar == 0) {
      this.createVarForm();
    }
    this.populateVarForm();
    this.questionEditForm.markAsDirty();
    // this.makeFormDirty();
  }

  onVarDelete () {
    // var confirmDelete: boolean = false;
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {data : "Delete variable?"});
    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog closed...");
      console.log(result);
      // confirmDelete = result;
      if (result) {
        this.varsDirty = true;
        console.log("Deleting question var with index:" + this.selectedVar);
        this.varsCopy = [
          ...this.varsCopy.slice(0,this.selectedVar),
          ...this.varsCopy.slice(this.selectedVar+1)
        ];
        console.log(this.varsCopy);
        if (this.varsCopy.length > 0) {
          if (this.selectedVar > 0) {
            this.selectedVar -= 1;
          }
          this.populateVarForm();
        } else {
          this.selectedVar = undefined;
        }
        this.questionEditForm.markAsDirty();
      }
    });
  }

  onVarSelected(id: number){
    console.log("Selected question variable no: " + id);
    this.selectedVar = id;
    this.populateVarForm();
    console.log(this.questionEditForm.get("vars").dirty);
    console.log(this.questionEditForm.dirty);
    this.questionEditForm.get("vars").markAsPristine();
    if (this.varsDirty) {this.questionEditForm.markAsDirty()};
    console.log(this.questionEditForm.get("vars").dirty);
    console.log(this.questionEditForm.dirty);
  }

  saveVarChanges() {
    this.varsDirty = true;
    console.log("Saving question variable...")
    console.log(this.varsCopy);
    console.log(this.questionsService.getQuestionSnapshot(this.id));
    this.varsCopy[this.selectedVar] = {
      ...this.varsCopy[this.selectedVar],
      name: this.questionEditForm.get("vars.name").value,
      defaultVal: this.questionEditForm.get("vars.defaultVal").value,
      specifiedVal: this.questionEditForm.get("vars.specifiedVal").value
    };
    console.log(this.varsCopy);
    console.log(this.questionsService.getQuestionSnapshot(this.id));
    this.questionEditForm.get("vars").markAsPristine();
    this.questionEditForm.markAsDirty();
  }

  createVarForm() {
    console.log("Creating VarForm...");
    this.questionEditForm.addControl("vars", new FormGroup({
      "name": new FormControl(this.varsCopy[this.selectedVar].name),
      "defaultVal": new FormControl(this.varsCopy[this.selectedVar].defaultVal),
      "specifiedVal": new FormControl(this.varsCopy[this.selectedVar].specifiedVal)
    }));
  }
  populateVarForm() {
    this.questionEditForm.get("vars.name").setValue(this.varsCopy[this.selectedVar].name);
    this.questionEditForm.get("vars.defaultVal").setValue(this.varsCopy[this.selectedVar].defaultVal);
    this.questionEditForm.get("vars.specifiedVal").setValue(this.varsCopy[this.selectedVar].specifiedVal);
  }

  ngOnDestroy() {

  }
}
