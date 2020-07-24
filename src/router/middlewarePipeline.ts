import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { Store } from '@/store';

export interface MiddlewareContext {
  to: RouteLocationNormalized;
  from: RouteLocationNormalized;
  next: NavigationGuardNext;
  store: Store;
}

export type Middleware = (context: MiddlewareContext) => void

const middlewarePipeline = (
  context: MiddlewareContext, middleware: Array<Middleware>, index: number,
) => {
  const nextMiddleware = middleware[index];

  if (!nextMiddleware) {
    return context.next;
  }

  return () => {
    const nextPipeline = middlewarePipeline(
      context, middleware, index + 1,
    );

    nextMiddleware({ ...context, next: nextPipeline });
  };
};

export default middlewarePipeline;
