import { Column, Entity } from 'typeorm';
import { Base } from '../base/entity';

@Entity({
  name: 'admin'
})
export class Admin_acc extends Base{
  @Column({
    nullable: false,
    unique: true
  })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;
}