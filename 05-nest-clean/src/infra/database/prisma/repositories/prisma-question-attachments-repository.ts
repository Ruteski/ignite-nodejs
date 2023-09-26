import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository';
import { Injectable } from '@nestjs/common';
import { undefined } from 'zod';
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment';

@Injectable()
export class PrismaQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  deleteManyByQuestionId(questionId: string): Promise<void> {
    throw new Error('Method not Implemented.');
  }

  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]> {
    throw new Error('Method not Implemented.');
  }
}
