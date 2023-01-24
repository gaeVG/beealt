import { AppController } from './app.controller';
import { DataSource } from 'typeorm';

export class AppModule extends AppController {
  private orm: DataSource;
  
  constructor() {
    super();
  }
  
  protected onStart(dbConfig:  {
    host?: string;
    port?: number;
    database?: string;
    username?: string;
    password?: string;
    synchronize?: boolean;
    logging?: boolean;
  }) {
  }
}
