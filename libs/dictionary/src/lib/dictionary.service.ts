 import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DictionaryEntry } from './dictionary.entity';

@Injectable()
export class DictionaryService {
  constructor(
    @InjectRepository(DictionaryEntry)
    private readonly repo: Repository<DictionaryEntry>,
  ) {}

  async addWord(source: string, translation: string) {
    const entry = this.repo.create({ source, translation });
    return this.repo.save(entry);
  }

  async getTranslation(source: string): Promise<string | null> {
    const entry = await this.repo.findOneBy({ source });
    return entry?.translation ?? null;
  }
}
