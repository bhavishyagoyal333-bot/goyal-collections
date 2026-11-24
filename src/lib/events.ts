import { EventEmitter } from 'events';

export type AppEventType =
  | 'order:created'
  | 'order:updated'
  | 'order:deleted'
  | 'product:created'
  | 'product:updated'
  | 'product:deleted'
  | 'category:updated'
  | 'stock:updated'
  | 'review:created'
  | 'review:updated'
  | 'customer:created'
  | 'settings:updated'
  | 'notification:new';

export interface RealtimeEvent {
  id: string;
  type: AppEventType;
  timestamp: number;
  payload: any;
}

// Global singleton EventEmitter across hot reloads in Next.js development
declare global {
  // eslint-disable-next-line no-var
  var __realtimeEmitter: EventEmitter | undefined;
  // eslint-disable-next-line no-var
  var __recentEvents: RealtimeEvent[] | undefined;
}

if (!global.__realtimeEmitter) {
  global.__realtimeEmitter = new EventEmitter();
  global.__realtimeEmitter.setMaxListeners(200);
}

if (!global.__recentEvents) {
  global.__recentEvents = [];
}

export const realtimeEmitter: EventEmitter = global.__realtimeEmitter;

export function emitRealtimeEvent(type: AppEventType, payload: any): RealtimeEvent {
  const event: RealtimeEvent = {
    id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
    type,
    timestamp: Date.now(),
    payload,
  };

  // Keep last 50 events in circular memory
  if (global.__recentEvents) {
    global.__recentEvents.unshift(event);
    if (global.__recentEvents.length > 50) {
      global.__recentEvents.pop();
    }
  }

  // Emit event to subscribers
  realtimeEmitter.emit('event', event);
  realtimeEmitter.emit(type, event);

  return event;
}

export function getRecentEvents(sinceTimestamp?: number): RealtimeEvent[] {
  const events = global.__recentEvents || [];
  if (!sinceTimestamp) return events.slice(0, 20);
  return events.filter((e) => e.timestamp > sinceTimestamp);
}
