import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';
import { AppModule } from './app.module';

type ApplicationConfig = {
  database?: MongoConnectionOptions;
};

export class ApplicationFactory extends AppModule {
  private static $self: ApplicationFactory;

  private constructor(private config: ApplicationConfig = {}) {
    super();
  }

  public static create(config?: ApplicationConfig): ApplicationFactory {
    if (!ApplicationFactory.$self) {
      ApplicationFactory.$self = new ApplicationFactory(config);
    }
    return ApplicationFactory.$self;
  }

  public start() {
    this.onStart(this.config.database);
  }
}
