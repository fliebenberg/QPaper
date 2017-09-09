import { Component, OnInit } from '@angular/core';
import { QuestionsService } from "./questions/questions.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private questionsService : QuestionsService) {
  }

  ngOnInit(){
    this.questionsService.loadQuestions();
  }

}
