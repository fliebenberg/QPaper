export class QuestionVar {
  public name: string;
  // public type: string;
  public defaultVal: string;
  public specifiedVal: string;
  public currentVal: string;

  constructor (
    name: string = "",
    // type: string = "",
    defaultVal: string = "",
    specifiedVal: string = "",
    currentVal: string = ""
  ) {
    this.name = name;
    // this.type = type;
    this.defaultVal = defaultVal;
    this.specifiedVal = specifiedVal;
    this.currentVal = currentVal;
  }
}
