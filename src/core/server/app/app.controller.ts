import { On } from '../decorators/on.decorators';
import { AppService } from './app.service';


export class AppController {
  static appService = new AppService();

  @On('serverStarted')
  onServerStarted(error: boolean) {
    AppController.appService.onServerResourceStart(error);
  }
}
