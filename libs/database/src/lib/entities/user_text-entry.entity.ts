import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './users-entry.entity';

@Entity()
export class UserText {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.texts)
  user!: User;

  @Column()
  title!: string;

  @Column({ type: 'text' })
  content!: string;
}
