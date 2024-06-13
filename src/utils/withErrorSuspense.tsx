import ErrorFallback from 'components/ErrorFallback';
import { Suspense } from 'react';
import * as Sentry from '@sentry/react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function withErrorSuspense<P extends string | number | object>(
  WrappedComponent: React.ComponentType<P>
) {
  function ComponentWithSuspense(props: P) {
    return (
      <Sentry.ErrorBoundary fallback={ErrorFallback}>
        <Suspense fallback={<div>loading...</div>}>
          <WrappedComponent {...props} />
        </Suspense>
      </Sentry.ErrorBoundary>
    );
  }

  return ComponentWithSuspense;
}
