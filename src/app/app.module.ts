import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";

import { MyNgMaterialModule } from "./ng-material/ng-material.module";
import { FlexLayoutModule } from "@angular/flex-layout";

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
import { RenderQAPipe } from "./questions/render-qa.pipe";
import { SafeHtmlPipe } from "./shared/safe-html.pipe";
import { SubjectSelectorComponent } from './subject-selector/subject-selector.component';

import { questionsReducer } from "./store/questions.reducer";
import { selectedQuestionReducer } from "./store/selected-question.reducer";
import { QuestionMetaComponent } from './questions/question-meta/question-meta.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { QuestionFilterPipe } from './shared/questionfilter.pipe';
import { GradeFilterPipe } from './shared/filter-pipes/grade-filter.pipe';
import { SubjectFilterPipe } from './shared/filter-pipes/subject-filter.pipe';
import { TopicFilterPipe } from './shared/filter-pipes/topic-filter.pipe';
import { CategoryFilterPipe } from './shared/filter-pipes/category-filter.pipe';
import { HomeComponent } from './home/home.component';

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
    RenderQAPipe,
    SafeHtmlPipe,
    SubjectSelectorComponent,
    QuestionMetaComponent,
    ConfirmDialogComponent,
    QuestionFilterPipe,
    SubjectFilterPipe,
    GradeFilterPipe,
    TopicFilterPipe,
    CategoryFilterPipe,
    HomeComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MyNgMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({questions: questionsReducer, selectedQuestion: selectedQuestionReducer}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  providers: [
    QuestionsService,
    QuestionExistsGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
