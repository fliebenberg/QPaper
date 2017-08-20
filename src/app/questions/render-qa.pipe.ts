import { Pipe, PipeTransform } from "@angular/core";
import { UpperCasePipe } from "@angular/common";

import { QuestionsService } from "./questions.service";

@Pipe({
  name: "render"
})
export class RenderQAPipe implements PipeTransform {
  constructor(private questionsService : QuestionsService){}

  transform(value: string){
    var newValue = value;
    newValue = newValue.toString().replace(/{/g,"<span class='question-var'>");
    newValue = newValue.toString().replace(/}/g,"</span>");
    return newValue;
  }
}
