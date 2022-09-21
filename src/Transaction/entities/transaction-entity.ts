import { User } from "src/Users/entities/users.entity";

export class Transaction {
  id?:string;
  payerID:String;
  payee:User;
  value:number;
  isReverse:boolean;
  createdAt?:Date;
  updatedAt?:Date;
}





