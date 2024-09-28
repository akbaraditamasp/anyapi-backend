import { instanceToPlain } from "class-transformer";
import { BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";

export default class BaseModel extends BaseEntity {
  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt!: Date;

  serialize() {
    return instanceToPlain(this);
  }
}
