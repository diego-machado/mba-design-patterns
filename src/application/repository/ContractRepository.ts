import Contract from "../../domain/Contract";

export default interface ContractRespository {
  list(): Promise<Contract[]>
}
