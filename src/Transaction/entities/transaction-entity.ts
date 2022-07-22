import { User } from "src/Users/entities/users.entity";

export class Transaction {
  id?:string;
  value:number;
  payerID:User;
  payeeID:User;
  createdAt?:Date;
  updatedAt?:Date;
}


