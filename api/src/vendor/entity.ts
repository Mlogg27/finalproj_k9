
import { Column, Entity } from "typeorm";
import { Base } from '../base/entity';

@Entity({
  name: 'vendor'
})
export class Vendor extends Base {
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
}

