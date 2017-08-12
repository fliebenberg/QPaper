export class Question {
  public id: string;
  public grade: string;
  public subject: string;
  public description: string;
  public questionText: string;
  public answerText: string;

  constructor(id: string, grade: string, subject: string, description: string, questionText: string, answerText: string) {
    this.id = id;
    this.grade = grade;
    this.subject = subject;
    this.description = description;
    this.questionText = questionText;
    this.answerText = answerText;
  }
}
