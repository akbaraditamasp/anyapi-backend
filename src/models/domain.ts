import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import BaseModel from "./base.js";

@Entity()
export class Domain extends BaseModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    unique: true,
  })
  name!: string;

  @Column({
    unique: true,
  })
  secret!: string;
}
