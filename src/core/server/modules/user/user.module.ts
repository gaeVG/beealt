import { Module } from '../../decorators/module.decorators';
import { UserController } from './user.controller';
import { Users } from './user.entity';

@Module({
  entities: [Users],
  controller: UserController,
})
export class UserModule {}
