import {Column, Entity} from "typeorm";
import {Base} from '../base/entity'


@Entity()
export class DriverAcc extends Base {
  @Column({
    unique: true
  })
  email: string

  @Column({
    unique: true,
  })
  phoneNumber: string;

  @Column({
  })
  password: string;

}