import { QuestionVar } from "./question-var.model";

export class Question {
  public id: string;
  public grade: string;
  public subject: string;
  public topic: string;
  public category: string;
  public description: string;
  public questionText: string;
  public answerText: string;
  public vars: QuestionVar[];

  constructor(
    id: string = "",
    grade: string = "",
    subject: string = "",
    topic: string = "",
    category: string = "",
    description: string = "",
    questionText: string = "",
    answerText: string = "",
    vars: QuestionVar[] = []
  ){
    this.id = id;
    this.grade = grade;
    this.subject = subject;
    this.topic = topic;
    this.category = category;
    this.description = description;
    this.questionText = questionText;
    this.answerText = answerText;
    this.vars = vars;
  }
}
