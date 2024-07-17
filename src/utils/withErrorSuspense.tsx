import ErrorFallback from 'components/ErrorFallback';
import React, {Suspense} from 'react';
import * as Sentry from '@sentry/react';

export function withErrorSuspense<P extends {} = {}>(
    WrappedComponent: React.JSXElementConstructor<P>
): React.FC<P>  {
  return (props: P) => {
      return (
        <Sentry.ErrorBoundary fallback={ErrorFallback}>
          <Suspense fallback={<div>loading...</div>}>
            <WrappedComponent {...props} />
          </Suspense>
        </Sentry.ErrorBoundary>
      );
    };
}
