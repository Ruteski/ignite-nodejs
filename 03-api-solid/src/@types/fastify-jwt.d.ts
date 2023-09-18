import '@fastify/jwt';

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string;
      role: 'ADMIN' | 'MEMBER';
      // id: number;
      // name: string;
      // age: number;
    }; // user type is return type of ‘request.user‘ object
  }
}
