import { Contract } from "./Contract";
import { ContractRespository } from "./ContractRepository";
import { Payment } from "./Payment";
import DatabaseConnection from "./infra/database/DatabaseConnection";

export class ContractDatabaseRepository implements ContractRespository {
  constructor(private readonly connection: DatabaseConnection) { }
  async list(): Promise<Contract[]> {
    const contracts: Contract[] = [];
    const contractsData = await this.connection.query("select * from branas.contract", []);
    for (const contractData of contractsData) {
      const contract = new Contract(
        contractData.id_contract,
        contractData.description,
        parseFloat(contractData.amount),
        contractData.periods,
        contractData.date,
      );

      const paymentsData = await this.connection.query("select * from branas.payment where id_contract = $1", [contract.idContract]);
      for (const paymentData of paymentsData) {
        contract.addPayment(
          new Payment(
            paymentData.id_payment,
            paymentData.date,
            parseFloat(paymentData.amount),
          )
        );
      }

      contracts.push(contract);
    }

    return contracts;
  }
}
