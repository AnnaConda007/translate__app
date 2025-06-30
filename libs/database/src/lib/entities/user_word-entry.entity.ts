import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './users-entry.entity';

@Entity()
export class UserWord {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.dictionary)
  user!: User;

  @Column()
  source!: string; // оригинал

  @Column()
  translation!: string;

  @Column({ default: 0 })
  progress!: number; // от 0 до 100, процент выученности

  @Column({ default: false })
  isLearned!: boolean;
}
