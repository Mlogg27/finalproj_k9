import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'blacklisttokens'
})
export class BlacklistTokens {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  token: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  expiresAt: Date;
}
