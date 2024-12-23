import { Column, Entity } from "typeorm";
import { Base } from '../base/entity';

@Entity({
  name: 'vehicle'
})
export class Vehicle extends Base {
  @Column({
    unique: true,
    nullable: false
  })
  plateNumber: string;

  @Column({
    nullable: false
  })
  color: string;

  @Column({
    nullable: false,
    unique: true
  })
  rc_number: string;

  @Column({
    nullable: false,
    unique: true
  })
  driver_id: number;

  @Column({
    nullable: false,
    type: 'json',
  })
  image: string;}