import UseCase from "./application/usecase/UseCase";

export default class LoggerDecorator implements UseCase {

  constructor(readonly usecase: UseCase) {
  }

  execute(input: any): Promise<any> {
    console.log(input.userAgent);
    return this.usecase.execute(input);
  }

}
