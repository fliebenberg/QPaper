import { Pipe, PipeTransform } from '@angular/core';
import { Question } from "../../store/question.model";

@Pipe({
  name: 'gradeFilter'
})
export class GradeFilterPipe implements PipeTransform {

  transform(questions: Question[]): string[] {
    return questions
    .map((question: Question) => {
      return question.grade;
    })
    .reduce((gradesArray : string[], grade: string) => {
      if (grade !== "" && gradesArray.indexOf(grade) == -1) {
        gradesArray.push(grade);
      }
      return gradesArray;
    },[])
    .sort();
  }

}
