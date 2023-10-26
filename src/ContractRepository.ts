import { Contract } from "./Contract";

export interface ContractRespository {
  list(): Promise<Contract[]>
}
