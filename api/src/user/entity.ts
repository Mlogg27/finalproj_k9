import {Column, Entity} from "typeorm";
import {Base} from '../base/entity'


@Entity()
export class Account extends Base {
  @Column({
    unique: true
  })
  email: string

  @Column({
    unique: true,
  })
  phoneNumber: number;

  @Column({
  })
  password: number;
}