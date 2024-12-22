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

@Entity({
  name: 'driver'
})
export class DriverInfo extends Base {
  @Column({
    nullable: false,
    unique: true,
  })
  identity_id: string;

  @Column({
    nullable: false
  })
  name: string;

  @Column({
    nullable: false
  })
  dob: Date;

  @Column({
    nullable: false,
  })
  address: string;

  @Column({
    nullable: false,
  })
  city: string;

  @Column({
    nullable: false,
  })
  country: string;

  @Column({
    nullable: false,
  })
  frond_id: string;

  @Column({
    nullable: false,
  })
  back_id: string;
}
