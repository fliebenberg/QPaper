import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuestionVar } from "../../store/question-var.model";

@Component({
  selector: 'app-question-vars',
  templateUrl: './question-vars.component.html',
  styleUrls: ['./question-vars.component.css']
})
export class QuestionVarsComponent implements OnInit {
  @Input() vars : QuestionVar[] = [];
  @Output() makeFormDirty = new EventEmitter();
  selectedVar : number;

  constructor() { }

  ngOnInit() {
    if (this.vars.length > 0) {
      this.selectedVar = 0;
    }
  }

  onNewVar(){
    console.log("Creating new question variable.");
    this.vars.push(new QuestionVar("Fred New Var"));
    this.selectedVar = this.vars.length-1;
    this.makeFormDirty.emit();
  }

  onVarSelected(id: number){
    console.log("Selected question variable no: " + id);
    this.selectedVar = id;
  }
}
