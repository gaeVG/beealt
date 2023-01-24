import { Module } from '../../decorators/module.decorators';
import { UserController } from './user.controller';
import { UsersEntity } from './user.entity';


@Module({
  entities: [UsersEntity],
})
export class UserModule extends UserController {
  constructor() {
    super();
  }
}
