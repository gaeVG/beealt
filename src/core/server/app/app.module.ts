import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';
import { DatabaseFactory } from '../libs/database';
import { AppController } from './app.controller';
import { UserModule } from '../modules/user/user.module';
import { ModuleFactory } from '../libs/module';

export class AppModule extends AppController {
  constructor(private userModule = UserModule) {
    super();
  }

  protected async onStart(dbConfig: MongoConnectionOptions) {
    await DatabaseFactory.init(dbConfig);
    ModuleFactory.loadModules();
  }
}
