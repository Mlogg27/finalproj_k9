import { Column, Entity } from "typeorm";
import { Base } from '../base/entity';

@Entity({
  name: 'driver_acc'
})
export class DriverAcc extends Base {
  @Column({
    unique: true,
    nullable: false
  })
  email: string;

  @Column({
    unique: true,
    nullable: false
  })
  phoneNumber: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: [ 'step2', 'step3', 'verified', 'unverified'],
    default: 'unverified'
  })
  verify: 'unverified' | 'step2' | 'step3' | 'verified';
}
