import { User } from "src/Users/entities/users.entity";

export class Category {
  id?:string;
  Title:string;
  Description:string;
  users?:User[];
  createdAt?:Date;
  updatedAt?:Date;
}
