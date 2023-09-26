import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository';
import { Injectable } from '@nestjs/common';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';
import { PaginationParams } from '@/core/repositories/pagination-params';

@Injectable()
export class PrismaAnswerCommentsRespository
  implements AnswerCommentsRepository
{
  create(answerComment: AnswerComment): Promise<void> {
    throw new Error('Method not Implemented.');
  }

  delete(answerComment: AnswerComment): Promise<void> {
    throw new Error('Method not Implemented.');
  }

  findById(id: string): Promise<AnswerComment | null> {
    throw new Error('Method not Implemented.');
  }

  findManyByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]> {
    throw new Error('Method not Implemented.');
  }
}
