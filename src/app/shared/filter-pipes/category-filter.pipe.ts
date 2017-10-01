import { Pipe, PipeTransform } from '@angular/core';
import { Question } from "../../store/question.model";

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(questions: Question[], grade?: string, subject?: string, topic?: string): string[] {
    return questions
    .filter((question: Question) => {
      var include: boolean = true;
      if (grade && grade !== "" && grade !== "ALL") {
        include = question.grade == grade;
      }
      if (include && subject && subject !== "" && subject !== "ALL") {
        include = question.subject == subject;
      }
      if (include && topic && topic !== "" && topic !== "ALL") {
        include = question.topic == topic;
      }
      return include;
    })
    .map((question: Question) => {
      return question.category;
    })
    .reduce((categoriesArray : string[], category: string) => {
      if (category !== "" && categoriesArray.indexOf(category) == -1) {
        categoriesArray.push(category);
      }
      return categoriesArray;
    },[])
    .sort();
  }

}
