import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuestionVar } from "../../../store/question-var.model";

@Component({
  selector: 'app-question-vars-list',
  templateUrl: './question-vars-list.component.html',
  styleUrls: ['./question-vars-list.component.css']
})
export class QuestionVarsListComponent implements OnInit {
  @Input() vars : QuestionVar[];
  @Input() selectedVar : number;
  @Output() onVarSelected = new EventEmitter();
  @Output() onNewVar = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
