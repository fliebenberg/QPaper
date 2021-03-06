import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PapersComponent } from "./papers/papers.component";
import { QuestionsComponent } from "./questions/questions.component";
import { QuestionEditComponent } from "./questions/question-edit/question-edit.component";
import { QuestionExistsGuard } from "./question-exists.guard";
import { QuestionListComponent } from "./questions/question-list/question-list.component";
import { QuestionViewComponent } from "./questions/question-view/question-view.component";
import { AdminComponent } from "./admin/admin.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { HomeComponent } from "./home/home.component";

const AppRoutes: Routes = [
  {path: "",
    // redirectTo: "questions",
    pathMatch: "full",
    component: HomeComponent
  },
  {path: "papers", component: PapersComponent},
  {path: "questions", component: QuestionsComponent},
  {path: "question/:id",
    // canActivate: [QuestionExistsGuard],
    component: QuestionViewComponent},
  {path: "question/:id/edit", component: QuestionEditComponent},
  {path: "admin", component: AdminComponent},
  {path: "not-found", component: NotFoundComponent},
  {path: "**", redirectTo: "not-found"}
]

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
