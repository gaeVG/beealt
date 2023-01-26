import { DataSource } from 'typeorm';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';
import { EntitiesRegister } from './entities.register';

export class DatabaseFactory extends DataSource {
  private static $self: DatabaseFactory;
  private static $config: MongoConnectionOptions;

  public static defaultConfig: MongoConnectionOptions = {
    type: 'mongodb',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 27017,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'balt',
    synchronize: true,
    logging: process.env.EXECUTION_MODE === 'safemode',
    subscribers: [],
    migrations: [],
    useUnifiedTopology: true,
  };

  private constructor(options?: MongoConnectionOptions) {
    if (options) DatabaseFactory.$config = options;
    if (!DatabaseFactory.$config) DatabaseFactory.$config = DatabaseFactory.defaultConfig;

    super({
      type: DatabaseFactory.$config.type || DatabaseFactory.defaultConfig.type,
      host: DatabaseFactory.$config.host || DatabaseFactory.defaultConfig.host,
      port: DatabaseFactory.$config.port || DatabaseFactory.defaultConfig.port,
      username: DatabaseFactory.$config.username || DatabaseFactory.defaultConfig.username,
      password: DatabaseFactory.$config.password || DatabaseFactory.defaultConfig.password,
      database: DatabaseFactory.$config.database || DatabaseFactory.defaultConfig.database,
      synchronize: DatabaseFactory.$config.synchronize || DatabaseFactory.defaultConfig.synchronize,
      logging: DatabaseFactory.$config.logging || DatabaseFactory.defaultConfig.logging,
      entities: EntitiesRegister.Entities.map((entity) => entity),
      subscribers: [],
      migrations: [],
      useUnifiedTopology: true,
    });
  }

  public static getInstance(options?: MongoConnectionOptions): DataSource {
    if (!DatabaseFactory.$self) {
      DatabaseFactory.$self = new DatabaseFactory(options);
    }
    return DatabaseFactory.$self;
  }

  public static async init(options: MongoConnectionOptions) {
    const instance = DatabaseFactory.getInstance(options);

    instance
      .initialize()
      .then(async () => {
        console.log('Database connected');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
