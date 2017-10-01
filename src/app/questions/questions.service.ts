import { OnInit, OnDestroy, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";

import { Store } from "@ngrx/store";
import { AppState } from "../store/app.state";
import { Question } from '../store/question.model';
import { QuestionVar } from "../store/question-var.model";
import * as QActions from "../store/questions.actions";
import * as SQActions from "../store/selected-question.actions";

// import "rxjs/add/operator/take";

// interface AppState {
//   questions: Question[];
// }
@Injectable()
export class QuestionsService implements OnInit, OnDestroy {
  private questions$: Observable<Question[]>;
  public grades$: Observable<string[]>;
  public subjects$: Observable<string[]>;
  public topics$: Observable<string[]>;
  public categories$: Observable<string[]>;
  private questions: Question[];
  private questionsSubscription : Subscription;
  private selectedQuestion$: Observable<Question>;

  private grades: string[] = [];
  private subjects: string[] = [];
  questionListHidden : boolean = false;
  questionsChanged = new Subject<Question[]>();
  gradesChanged = new Subject<string[]>();
  subjectsChanged = new Subject<string[]>();

  constructor (private store : Store<AppState>) {
    console.log("questionsService constructing...");
    this.questions$ = this.store.select("questions");
    this.selectedQuestion$ = this.store.select("selectedQuestion");
    this.questionsSubscription = this.store.select("questions").subscribe(
      (questions : Question[]) => {
        this.questions = questions;
      }
    )
    console.log("Grades loading...");
    this.grades$ =
      this.questions$.map((questions: Question[]) => {
        return questions.map((question: Question) => {
          return question.grade
        }).reduce((gradesArray : string[], grade: string) => {
          if (grade !== "" && gradesArray.indexOf(grade) == -1) {
            gradesArray.push(grade);
          }
          return gradesArray;
        }, []).sort();
      });
    console.log("Subjects loading...");
    this.subjects$ =
      this.questions$.map((questions: Question[]) => {
        return questions.map((question: Question) => {
          return question.subject
        }).reduce((subjectsArray : string[], subject: string) => {
          if (subject !== "" && subjectsArray.indexOf(subject) == -1) {
            subjectsArray.push(subject);
          }
          return subjectsArray;
        }, []).sort();
      });
    console.log("Topics loading...");
    this.topics$ =
      this.questions$.map((questions: Question[]) => {
        return questions.map((question: Question) => {
          return question.topic
        }).reduce((topicsArray : string[], topic: string) => {
          if (topic !== "" && topicsArray.indexOf(topic) == -1) {
            topicsArray.push(topic);
          }
          return topicsArray;
        }, []).sort();
      });
    console.log("Categories loading...");
    this.categories$ =
      this.questions$.map((questions: Question[]) => {
        return questions.map((question: Question) => {
          return question.category
        }).reduce((categoriesArray : string[], category: string) => {
          if (category !== "" && categoriesArray.indexOf(category) == -1) {
            categoriesArray.push(category);
          }
          console.log("cats:");
          console.log(categoriesArray);
          return categoriesArray;
        }, []).sort();
      });
  }

  ngOnInit(){
  }

  loadQuestions(){
    this.addQuestion(new Question('1', 'Grade 1', 'Maths', 'Basic Maths','','Basic math question', 'What is 1+1?', 'Answer is 2',
      // question variables array
      [
        new QuestionVar("FredVar1", "3"),
        new QuestionVar("FredVar2", "Tata")
      ])
    );
    this.addQuestion(new Question('2', 'Grade 1', 'English', 'Basic English','','First English question', 'What is a {verb}?', 'A verb is a \'do\' word.'));
    this.addQuestion(new Question('3', 'Grade 4', 'Geography', 'Advanced Geography','Africa','This is a much longer geography question', 'What was the ancient capital of Thailand called?', 'Suhkothai'));
    console.log("Questions loaded");
    console.log(this.getQuestionSnapshot("2"));
  }

  getQuestionsSnapshot() : Question[] {
    return Object.assign({},this.questions);
  }

  getQuestionSnapshot(id: string) : Question {
    var tempQ : Question;
    // this.questions$
    //   .take(1)
    //   .map(questionArray => {
    //     return questionArray.find(question =>{
    //       return question.id == id;
    //     })
    //   })
    //   .subscribe(question => {tempQ = question});
    tempQ = Object.assign({},this.questions.find(q => q.id == id));
    console.log("Question snapshot...");
    console.log(tempQ);
    return tempQ;
  }

  setSelectedQuestion(id : string) : boolean {
    var question = this.getQuestionSnapshot(id);
    if (question.id) {
      console.log ("Done! Selected question set to "+ question.id);
      this.store.dispatch(new SQActions.SetAction(question));
      return true;
    } else {
      console.log("Failure: Could not find question with id :"+ question.id);
      this.store.dispatch(new SQActions.SetAction(null));
      return false
    };
  }

  getSelectedQuestion() : Observable<Question> {
    return this.selectedQuestion$;
  }

  replaceQuestion(newQuestion: Question) : void {
    this.store.dispatch(new QActions.Replace(newQuestion));
  }

  addQuestion(question : Question) : string {
    if (question.id == "NEW") {
      let newId: string = this.getNewQuestionId();
      question.id = newId;
    }
    this.store.dispatch(new QActions.Add(question));
    return question.id;
  }

  getNewQuestionId () : string {
    let maxId = "0";
    this.questions.forEach((question : Question) => {
      if (+question.id > +maxId) {
        maxId = question.id;
      }
    })
    return (+maxId+1).toString();
  }
  deleteQuestion(question: Question) : void {
    this.store.dispatch(new QActions.Delete(question));
    // let subscription = this.selectedQuestion.subscribe(q => {
    //   if (q.id === question.id) {
    //       this.store.dispatch(new SQActions.SetAction(null));
    //   }
    // subscription.unsubscribe;
    // })

  }

  addGrade(newGrade : string) {
    if (this.grades.indexOf(newGrade) == -1){
      this.grades.push(newGrade);
      this.gradesChanged.next(this.grades.slice());

    }
  }

  addSubject(newSubject : string) {
    if (this.subjects.indexOf(newSubject) == -1){
      this.subjects.push(newSubject);
      this.subjectsChanged.next(this.subjects.slice());

    }
  }

  findVar(inString :string) : {startPos : number, endPos: number} {
    var startPos = inString.search(/{/);
    var endPos = inString.search(/}/);
    return {startPos, endPos};
  }

  ngOnDestroy(){
    this.questionsSubscription.unsubscribe();
  }
}
