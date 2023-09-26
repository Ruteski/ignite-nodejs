import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { Injectable } from '@nestjs/common';
import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { PaginationParams } from '@/core/repositories/pagination-params';

@Injectable()
export class PrismaAnswersRepository implements AnswersRepository {
  create(answer: Answer): Promise<void> {
    throw new Error('Method not Implemented.');
  }

  delete(answer: Answer): Promise<void> {
    throw new Error('Method not Implemented.');
  }

  findById(id: string): Promise<Answer | null> {
    throw new Error('Method not Implemented.');
  }

  findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]> {
    throw new Error('Method not Implemented.');
  }

  save(answer: Answer): Promise<void> {
    throw new Error('Method not Implemented.');
  }
}
