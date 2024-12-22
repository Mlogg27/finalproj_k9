import { Column, Entity } from 'typeorm';
import { Base } from '../base/entity';

@Entity({
  name: 'images',
})
export class Images extends Base {
  @Column({
    nullable: false,
    unique: true,
  })
  path: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  })
  status: 'pending' | 'approved' | 'rejected';

  @Column({ type: 'timestamp',  nullable: false,
  })
  expiresAt: Date;
}
