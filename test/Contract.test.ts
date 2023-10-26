import { Contract } from "../src/Contract";

//unit test
test("Deve calcular o saldo do contrato", function () {
  const contract = new Contract("", "", 6000, 12, new Date("2022-01-01T10:00:00"));
  const invoices = contract.generateInvoices(1, 2022, "accrual");

  expect(invoices[0]?.date).toEqual(new Date("2022-01-01T13:00:00.000Z"));
  expect(invoices[0]?.amount).toBe(500);
});