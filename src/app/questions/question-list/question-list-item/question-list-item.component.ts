import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

import { Question } from "../../question.model";
import { QuestionsService } from "../../questions.service";

@Component({
  selector: 'app-question-list-item',
  templateUrl: './question-list-item.component.html',
  styleUrls: ['./question-list-item.component.css']
})
export class QuestionListItemComponent implements OnInit {
  @Input() question: Question;
  @Input() index: number;

  constructor(private questionsService : QuestionsService, private router: Router) { }

  ngOnInit() {
  }

  onEdit() {
    console.log("Question " + this.index + " was edited!")
  }
  onDelete() {
    console.log("Question " + this.index + " was deleted!");
    this.questionsService.removeQuestion(this.index);
  }

}
