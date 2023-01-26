import { on, IServerEvent } from 'alt-server';

export function On<EventName extends keyof IServerEvent>(eventName: EventName) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value.bind(target);

    on(eventName, (...args: any[]) => {
      originalMethod(...args);
    });
  };
}
