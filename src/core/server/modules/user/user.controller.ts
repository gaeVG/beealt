import { Player } from 'alt-server';
import { On } from '../../decorators/on.decorators';
import { UserService } from './user.service';

export class UserController {
  static userService: UserService;

  constructor() {
    UserController.userService = new UserService();
  }

  @On('playerConnect')
  onPlayerConnect(player: Player) {
    UserController.userService.onPlayerConnect(player);
  }
}
