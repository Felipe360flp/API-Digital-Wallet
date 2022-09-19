import { User } from "src/Users/entities/users.entity";

export class Transaction {
  id?:string;
  payerID:String;
  payee:User;
  value:number;
  createdAt?:Date;
  updatedAt?:Date;
}





