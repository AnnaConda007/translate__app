import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserText } from './user_text-entry.entity';
import { UserWord } from './user_word-entry.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, nullable: true })
  user_id!: string;

  @Column({ nullable: true })
  user_name!: string;

  @Column({ unique: true, nullable: true })
  email!: string;

  @OneToMany(() => UserWord, (word) => word.user)
  dictionary!: UserWord[];

  @OneToMany(() => UserText, (text) => text.user)
  texts!: UserText[];
}
