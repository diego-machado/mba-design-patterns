import ContractRespository from "../repository/ContractRepository";
import Presenter from "../presenter/Presenter";
import JsonPresenter from "../../infra/presenter/JsonPresenter";
import UseCase from "./UseCase";
import Mediator from "../../infra/mediator/Mediator";

export default class GenerateInvoices implements UseCase {

  constructor(
    private readonly contractRepository: ContractRespository,
    private readonly presenter: Presenter = new JsonPresenter(),
    private readonly mediator: Mediator = new Mediator()
  ) { }

  async execute(input: Input): Promise<Output[]> {
    const contracts = await this.contractRepository.list();
    const output: Output[] = [];

    for (const contract of contracts) {
      const invoices = contract.generateInvoices(input.month, input.year, input.type);
      for (const invoice of invoices) {
        output.push({
          date: invoice.date,
          amount: invoice.amount,
        })
      }
    }
    this.mediator.publish("InvoicesGenerated", output);
    return this.presenter.present(output);
  }
}

type Input = {
  month: number;
  year: number;
  type: string;
}

export type Output = {
  date: Date;
  amount: number;
}
