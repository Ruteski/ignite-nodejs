import { UsersRepository } from '@/repositories/users-repository';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { compare } from 'bcryptjs';

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

type AuthenticateUseCaseResponse = void;

export class Authenticate {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatch = await compare(password, user.password_hash);

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}
