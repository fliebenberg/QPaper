import { Pipe, PipeTransform } from '@angular/core';
import { Question } from "../../store/question.model";

@Pipe({
  name: 'topicFilter'
})
export class TopicFilterPipe implements PipeTransform {

  transform(questions: Question[], grade?: string, subject?: string): string[] {
    return questions
    .filter((question: Question) => {
      var include: boolean = true;
      if (grade && grade !== "" && grade !== "ALL") {
        include = question.grade == grade;
      }
      if (include && subject && subject !== "" && subject !== "ALL") {
        include = question.subject == subject;
      }
      return include;
    })
    .map((question: Question) => {
      return question.topic;
    })
    .reduce((topicsArray : string[], topic: string) => {
      if (topic !== "" && topicsArray.indexOf(topic) == -1) {
        topicsArray.push(topic);
      }
      return topicsArray;
    },[])
    .sort();
  }

}
