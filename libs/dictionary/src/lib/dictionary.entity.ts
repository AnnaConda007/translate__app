 import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DictionaryEntry {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  source!: string;

  @Column()
  
  translation!: string;
}
