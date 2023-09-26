import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository';
import { Injectable } from '@nestjs/common';
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';
import { PaginationParams } from '@/core/repositories/pagination-params';

@Injectable()
export class PrismaQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  create(questionComment: QuestionComment): Promise<void> {
    throw new Error('Method not Implemented.');
  }

  delete(questionComment: QuestionComment): Promise<void> {
    throw new Error('Method not Implemented.');
  }

  findById(id: string): Promise<QuestionComment | null> {
    throw new Error('Method not Implemented.');
  }

  findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]> {
    throw new Error('Method not Implemented.');
  }
}
