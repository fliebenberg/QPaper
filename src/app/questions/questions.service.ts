import { OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Question } from './question.model';

export class QuestionsService {
  private questions: Question[] = [];
  currentQuestion: number = null;
  questionListHidden : boolean = false;
  questionsChanged = new Subject<Question[]>();

  constructor () {
    this.addQuestion(new Question('1', 'Grade 1', 'Maths', 'Basic math question', 'What is 1+1?', 'Answer is 2'));
    this.addQuestion(new Question('2', 'Grade 1', 'English', 'First English question', 'What is a verb?', 'A verb is a \'do\' word.'));
    this.addQuestion(new Question('3', 'Grade 4', 'Geography', 'This is a much longer geography question', 'What was the ancient capital of Thailand called?', 'Suhkothai'));
  }

  getQuestions() : Question[] {
    return this.questions.slice();
  }

  getQuestion(index: number) : Question {
    return this.questions.slice(index,index+1)[0];
    //return this.questions[index];
  }

  replaceQuestion(index: number, newQuestion: Question){
    this.questions.splice(index,1,newQuestion);
    this.questionsChanged.next(this.questions.slice());
  }

  addQuestion(question: Question) {
    this.questions.push(question);
    this.questionsChanged.next(this.questions.slice());
  }

  removeQuestion(index: number): boolean {
    if (index < this.questions.length && index >= 0) {
      this.questions.splice(index,1);
      this.questionsChanged.next(this.questions.slice());
      return true;
    } else {
      return false;
    }
  }
}
