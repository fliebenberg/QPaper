import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { MyNgMaterialModule } from "./ng-material.module";

import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { GradeSelectorComponent } from './grade-selector/grade-selector.component';
import { NotFoundComponent } from './not-found/not-found.component'
import { PapersComponent } from './papers/papers.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionsService } from './questions/questions.service';
import { QuestionEditComponent } from './questions/question-edit/question-edit.component';
import { QuestionExistsGuard } from './question-exists.guard';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { QuestionListItemComponent } from './questions/question-list/question-list-item/question-list-item.component';
import { QuestionViewComponent } from './questions/question-view/question-view.component';
import { SubjectSelectorComponent } from './subject-selector/subject-selector.component';

@NgModule({
  declarations: [
    AdminComponent,
    AppComponent,
    HeaderComponent,
    GradeSelectorComponent,
    NotFoundComponent,
    PapersComponent,
    QuestionsComponent,
    QuestionEditComponent,
    QuestionListComponent,
    QuestionListItemComponent,
    QuestionViewComponent,
    SubjectSelectorComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MyNgMaterialModule,
    FormsModule
  ],
  providers: [QuestionsService, QuestionExistsGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }