import { log } from 'alt-server';

export class AppService {
  constructor() {
    console.log('AppService constructor');
  }
  onServerResourceStart(error: boolean) {
    if (error) {
      log('Resource failed to start');
    } else {
      log('Application started');
    }
  }
}
