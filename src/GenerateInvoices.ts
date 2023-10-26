import moment from "moment"
import { ContractRespository } from "./ContractRepository";
export class GenerateInvoices {

  constructor(private readonly contractRepository: ContractRespository) { }

  async execute(input: Input): Promise<Output[]> {
    const contracts = await this.contractRepository.list();
    const output: Output[] = [];

    for (const contract of contracts) {
      const invoices = contract.generateInvoices(input.month, input.year, input.type);
      for (const invoice of invoices) {
        output.push({
          date: moment(invoice.date).format("YYYY-MM-DD"),
          amount: invoice.amount,
        })
      }
    }

    return output;
  }
}

type Input = {
  month: number;
  year: number;
  type: string;
}

type Output = {
  date: string;
  amount: number;
}
