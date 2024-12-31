
import { Column, Entity } from "typeorm";
import { Base } from '../base/entity';

@Entity({
  name: 'request'
})
export class Requests extends Base {
  @Column({
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
  })
  phone: string;
  @Column({
    nullable: false,
  })
  type: string;
}

