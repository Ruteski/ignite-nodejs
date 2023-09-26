import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { Question } from '@/domain/forum/enterprise/entities/question';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaQuestionRepository implements QuestionsRepository {
  create(question: Question): Promise<void> {
    throw new Error('Method not Implemented.');
  }

  delete(question: Question): Promise<void> {
    throw new Error('Method not Implemented.');
  }

  findById(id: string): Promise<Question | null> {
    throw new Error('Method not Implemented.');
  }

  findBySlug(slug: string): Promise<Question | null> {
    throw new Error('Method not Implemented.');
  }

  findManyRecent(params: PaginationParams): Promise<Question[]> {
    throw new Error('Method not Implemented.');
  }

  save(question: Question): Promise<void> {
    throw new Error('Method not Implemented.');
  }
}
