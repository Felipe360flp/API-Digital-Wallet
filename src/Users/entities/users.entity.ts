import { Category } from "src/Category/entities/category-entity";

export class User {
  id?:string;
  Name:string;
  Email:string;
  Password:number;
  category?:Category[];
  createdAt?:Date;
  updatedAt?:Date;
}
