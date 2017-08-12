import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { MdListModule, MdButtonModule } from "@angular/material";

import { Question } from '../question.model';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit, OnDestroy {
  questions: Question[] = [];
  private myQuestionsChangedSub: Subscription;

  constructor(private questionsService: QuestionsService) {

  }

  ngOnInit() {
    this.questions = this.questionsService.getQuestions();
    this.myQuestionsChangedSub = this.questionsService.questionsChanged.subscribe(
      (newQuestionsArray : Question[]) => {
        this.questions = newQuestionsArray;
      }
    )
  }

  onAddQuestion() {
    this.questionsService.addQuestion(
      new Question('3', 'Grade6', 'Maths', 'Dificult math question', 'What is 100+100?', 'Answer is 200')
    )
  }

  onDeleteQuestion() {
    this.questionsService.removeQuestion(0);
  }

  ngOnDestroy() {
    this.myQuestionsChangedSub.unsubscribe();
  }

}
