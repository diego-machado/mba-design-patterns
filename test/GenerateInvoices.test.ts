import { ContractDatabaseRepository } from "../src/ContractDatabaseRepository";
import { ContractRespository } from "../src/ContractRepository";
import { GenerateInvoices } from "../src/GenerateInvoices";
import DatabaseConnection from "../src/infra/database/DatabaseConnection";
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter";

let generateInvoices: GenerateInvoices;
let connection: DatabaseConnection;
let contractRepository: ContractRespository;

// integration test
beforeEach(() => {
  // const contractRepository: ContractRepository = {
  // 	async list (): Promise<any> {
  // 		return [
  // 			{
  // 				idContract: "",
  // 				description: "",
  // 				periods: 12,
  // 				amount: "6000",
  // 				date: new Date("2022-01-01T10:00:00"),
  // 				payments: [
  // 					{
  // 						idPayment: "",
  // 						idContract: "",
  // 						amount: 6000,
  // 						date: new Date("2022-01-05T10:00:00")
  // 					}
  // 				]
  // 			}
  // 		]
  // 	}
  // }
  connection = new PgPromiseAdapter();
  contractRepository = new ContractDatabaseRepository(connection);
  generateInvoices = new GenerateInvoices(contractRepository);
});

test("Deve gerar as notas fiscais por regime de caixa", async () => {
  const input = {
    month: 1,
    year: 2022,
    type: "cash",
  }

  const output = await generateInvoices.execute(input);
  expect(output[0]?.date).toBe("2022-01-05");
  expect(output[0]?.amount).toBe(6000);
});

test("Deve gerar as notas fiscais por regime de competência", async () => {
  const input = {
    month: 1,
    year: 2022,
    type: "accrual",
  }

  const output = await generateInvoices.execute(input);
  expect(output[0]?.date).toBe("2022-01-01");
  expect(output[0]?.amount).toBe(500);
});

test("Deve gerar as notas fiscais por regime de competência", async () => {
  const input = {
    month: 2,
    year: 2022,
    type: "accrual",
  }

  const output = await generateInvoices.execute(input);
  expect(output[0]?.date).toBe("2022-02-01");
  expect(output[0]?.amount).toBe(500);
});


afterEach(async () => {
  await connection.close();
});
