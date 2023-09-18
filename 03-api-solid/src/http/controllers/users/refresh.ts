import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true });

  const authenticatodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
      },
    },
  );

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d',
      },
    },
  );

  reply
    .setCookie('refreshToken', refreshToken, {
      path: '/', // toda aplicacao tem acesso a este cookie
      secure: true, // incriptado por hhts
      sameSite: true, // acessivel apenas por este site
      httpOnly: true, // acessivel apenas pelo backend
    })
    .status(200)
    .send({
      token,
    });
}
