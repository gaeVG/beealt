import { DataSource } from "typeorm";
import { MongoConnectionOptions } from "typeorm/driver/mongodb/MongoConnectionOptions";
import { EntitiesRegister } from "./entities.register";


export class DatabaseFactory extends DataSource {
  private static $self: DatabaseFactory;

  private constructor(options: MongoConnectionOptions) {
    super({
      type: 'mongodb',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 27017,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'fivem',
      synchronize: true,
      logging: process.env.EXECUTION_MODE === 'safemode',
      entities: EntitiesRegister.Entities,
      subscribers: [],
      migrations: [],
      useUnifiedTopology: true,

    });
  }

  public static create(options: MongoConnectionOptions): DataSource {
    if (!DatabaseFactory.$self) {
      DatabaseFactory.$self = new DatabaseFactory(options);
    }
    return DatabaseFactory.$self;
  }

  public static async init(options: MongoConnectionOptions) {
    const datasource = DatabaseFactory.create(options);
    datasource.initialize().then(async () => {
      console.log('Database connection has been established successfully.');
    }).catch((error) => {
      console.log(error);  
    });
  }
}
