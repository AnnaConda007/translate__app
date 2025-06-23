import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserWord } from "./user_word-entry.entity";
import { UserText } from "./user_text-entry.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column({ unique: true })
  user_id!: string;

  @Column({ unique: true })
  email!: string;

  @OneToMany(() => UserWord, word => word.user)
  dictionary!: UserWord[];

  @OneToMany(() => UserText, text => text.user)
  texts!: UserText[];
}
