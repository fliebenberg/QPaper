import { Component, OnInit, Input } from '@angular/core';
import { Question } from "../../store/question.model";

@Component({
  selector: 'app-question-meta',
  templateUrl: './question-meta.component.html',
  styleUrls: ['./question-meta.component.css']
})
export class QuestionMetaComponent implements OnInit {
  @Input() question : Question;

  constructor() { }

  ngOnInit() {
  }

}
