import { Pipe, PipeTransform } from "@angular/core";
import { UpperCasePipe } from "@angular/common";

@Pipe({
  name: "render"
})
export class RenderQAPipe implements PipeTransform {

  transform(value: string){
    var newValue = value;
    if (newValue) {
      newValue = newValue.toString().replace(/{/g,"<span class='question-var'>");
      newValue = newValue.toString().replace(/}/g,"</span>");
    }
    return newValue;
  }
}
