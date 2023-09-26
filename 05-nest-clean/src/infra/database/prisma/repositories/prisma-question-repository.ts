import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { Question } from '@/domain/forum/enterprise/entities/question';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { PrismaQuestionMapper } from '@/infra/database/prisma/mappers/prisma-question-mapper';

@Injectable()
export class PrismaQuestionRepository implements QuestionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(question: Question): Promise<void> {
    throw new Error('Method not Implemented.');
  }

  async delete(question: Question): Promise<void> {
    throw new Error('Method not Implemented.');
  }

  async findById(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        id,
      },
    });

    if (!question) {
      return null;
    }

    return PrismaQuestionMapper.toDomain(question);
  }

  async findBySlug(slug: string): Promise<Question | null> {
    throw new Error('Method not Implemented.');
  }

  async findManyRecent(params: PaginationParams): Promise<Question[]> {
    throw new Error('Method not Implemented.');
  }

  async save(question: Question): Promise<void> {
    throw new Error('Method not Implemented.');
  }
}
