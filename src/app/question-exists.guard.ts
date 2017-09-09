import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";

import { QuestionsService } from "./questions/questions.service";

@Injectable()
export class QuestionExistsGuard implements CanActivate {
  private param: string;
  // private path: string;

  constructor(
    private questionsService: QuestionsService,
    private router: Router
  ){};

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
    this.param = route.params['index'];
    // this.path="";
    // for (let partPath of route.pathFromRoot){
    //   this.path = this.path + partPath.url.toString() + "/";
    // };
    // console.log(this.path);
    if (isNaN(+this.param) || +this.param >= this.questionsService.getQuestionsSnapshot().length) {
      //console.log("Problem with question Param");
      this.router.navigate(['/questions']);
      return false;
    } else {
      return true;
    }
  }
}
