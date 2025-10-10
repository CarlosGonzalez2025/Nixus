
'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/lib/error-emitter';
import type { FirestorePermissionError } from '@/lib/errors';

/**
 * A client component that listens for Firestore permission errors
 * and throws them to be caught by Next.js's development error overlay.
 * This should be placed at the root of your layout.
 */
export function FirebaseErrorListener() {
  useEffect(() => {
    const handleError = (error: FirestorePermissionError) => {
      // In a production environment, you might want to log this to a service
      // like Sentry, but for development, we just throw it to get the overlay.
      if (process.env.NODE_ENV === 'development') {
        setTimeout(() => {
          throw error;
        }, 0);
      }
    };

    errorEmitter.on('permission-error', handleError);

    // No need to return a cleanup function as the emitter is a singleton
  }, []);

  return null; // This component doesn't render anything
}
