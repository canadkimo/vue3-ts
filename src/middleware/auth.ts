import { Middleware } from '@/router/middlewarePipeline';

const auth: Middleware = (context) => {
  console.log('auth middleware');
  return context.next();
};

export default auth;
