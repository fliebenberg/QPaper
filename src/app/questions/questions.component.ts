import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/subscription';

import { QuestionsService } from './questions.service';
import { Question } from './question.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  // questions : Question[];
  // myQuestionsChangedSub : Subscription;

  constructor(private questionsService: QuestionsService,
              private route: ActivatedRoute,
              private router: Router)
  {}

  ngOnInit() {

  }

}
