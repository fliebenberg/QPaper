import { Pipe, PipeTransform } from '@angular/core';
import { Question } from "../../store/question.model";

@Pipe({
  name: 'subjectFilter'
})
export class SubjectFilterPipe implements PipeTransform {

  transform(questions: Question[], grade?: string): string[] {
    return questions
    .filter((question: Question) => {
      if (grade && grade !== "" && grade !== "ALL"){
        return question.grade == grade;
      } else {
        return true;
      }
    })
    .map((question: Question) => {
      return question.subject;
    })
    .reduce((subjectsArray : string[], subject: string) => {
      if (subject !== "" && subjectsArray.indexOf(subject) == -1) {
        subjectsArray.push(subject);
      }
      return subjectsArray;
    },[])
    .sort();
  }

}
