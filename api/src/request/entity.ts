
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
  @Column({
    nullable: true,
    default: 'none',
  })
  location: string;

  @Column({
    type: 'enum',
    enum: [ 'pending', 'approved', 'rejected'],
    default: 'pending'
  })
  status: 'pending' | 'approved' | 'rejected';
}

