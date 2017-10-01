import { Pipe, PipeTransform } from '@angular/core';

import { Question } from "../store/question.model";

@Pipe({
  name: 'questionFilter'
})
export class QuestionFilterPipe implements PipeTransform {

  transform(questions: Question[], grade?: string, subject?: string, topic?: string, category?: string): Question[] {
    if (questions.length == 0) {
      return questions;
    } else {
      return questions.filter((question : Question) => {
        if (grade && grade !== "ALL") {
          if (question.grade !== grade) {return false};
        }
        if (subject && subject !== "ALL") {
          if (question.subject !== subject) {return false};
        }
        if (topic && topic !== "ALL") {
          if (question.topic !== topic) {return false};
        }
        if (category && category !== "ALL") {
          if (question.category !== category) {return false};
        }
        return true;
      })
    }
  }

}
