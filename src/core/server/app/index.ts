import { AppModule } from './app.module';

type ApplicationConfig = {
    database?: {
        host?: string;
        port?: number;
        database?: string;
        username?: string;
        password?: string;
        synchronize?: boolean;
        logging?: boolean;
    }
};

export class ApplicationFactory extends AppModule {
    private static $self: ApplicationFactory;

    private constructor(private config: ApplicationConfig = { database : {}}) {
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
