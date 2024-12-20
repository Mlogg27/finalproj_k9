import { Column, Entity } from "typeorm";
import { Base } from '../base/entity';

@Entity({
  name: 'images'
})
export class Images extends Base {
  @Column({
    nullable: false,
    unique: true
  })
  path: string
}
