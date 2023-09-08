import { app } from './app';
import { env } from './env';

const host = 'RENDER' in process.env ? 'o.o.o.o' : 'localhost';

app
  .listen({
    port: env.PORT,
    host,
  })
  .then(() => {
    console.log('HTTP Server running in port 3333!');
  });
