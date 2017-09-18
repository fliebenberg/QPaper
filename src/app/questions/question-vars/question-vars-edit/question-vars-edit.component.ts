import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuestionVar } from "../../../store/question-var.model";

@Component({
  selector: 'app-question-vars-edit',
  templateUrl: './question-vars-edit.component.html',
  styleUrls: ['./question-vars-edit.component.css']
})
export class QuestionVarsEditComponent implements OnInit {
  @Input() qVar : QuestionVar;

  constructor() { }

  ngOnInit() {
  }

}
