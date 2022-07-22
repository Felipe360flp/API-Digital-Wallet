import { Category } from "src/Category/entities/category-entity";

export class User {
  id?:string;
  name:string;
  email:string;
  password:string;
  confirmPassword:string;
  cpf_cnpj:number
  category?:Category;
  createdAt?:Date;
  updatedAt?:Date;
}
