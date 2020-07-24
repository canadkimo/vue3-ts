import { Middleware } from '@/router/middlewarePipeline';

const admin: Middleware = (context) => {
  console.log('admin middleware');
  return context.next();
};

export default admin;
