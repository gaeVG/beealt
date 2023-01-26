import { log, Player } from 'alt-server';
import { DatabaseFactory } from '../../libs/database';
import { Users as UsersEntity } from './user.entity';

export class UserService {
  constructor(private readonly orm = DatabaseFactory.getInstance()) {}

  private async createUserOnDB(player: Player) {
    const user = new UsersEntity();
    user.socialID = player.socialID;

    return await this.orm.manager.save(user);
  }

  private async getUserFromDB(player: Player) {
    let userFromDB = await this.orm.getMongoRepository(UsersEntity).findOne({
      where: {
        socialID: player.socialID,
      },
    });

    if (!userFromDB) {
      userFromDB = await this.createUserOnDB(player);
    }

    return userFromDB;
  }

  async onPlayerConnect(player: Player) {
    const userFromDB = await this.getUserFromDB(player);
    log(
      `[Social ID: ${player.socialID} | Application ID: ${userFromDB.id.toString()}] ${
        player.name
      } has connected to the server.`
    );

    player.model = 'mp_m_freemode_01';
    player.spawn(36.194, 859.385, 197.713, 0);
    console.log(player.armour);
  }
}
