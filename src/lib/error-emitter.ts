
import { EventEmitter } from 'events';
import type { FirestorePermissionError } from './errors';

// This is a workaround for the fact that EventEmitter is not typed
interface TypedEventEmitter {
  on(event: 'permission-error', listener: (error: FirestorePermissionError) => void): this;
  emit(event: 'permission-error', error: FirestorePermissionError): boolean;
}

class SafeEventEmitter extends EventEmitter implements TypedEventEmitter {}

// Create a singleton instance of the event emitter
export const errorEmitter = new SafeEventEmitter();
