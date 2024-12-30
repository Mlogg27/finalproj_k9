

import { Column, Entity } from "typeorm";
import { Base } from '../base/entity';

@Entity({
  name: 'store'
})
export class Store extends Base {
  @Column({
    unique: true,
    nullable: false
  })
  name: string;

  @Column({
    nullable: false,
    unique: true
  })
  email: string;

  @Column({
    nullable: false,
    unique: true
  })
  phone: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: false,
  })
  location: string;
  @Column({
    nullable: false,
  })
  vendor_id: number;
}

