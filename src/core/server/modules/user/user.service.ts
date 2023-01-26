import { log, Player } from 'alt-server';
import { DataSource } from 'typeorm';
import { DatabaseFactory } from '../../libs/database';
import { EntitiesRegister } from '../../libs/database/entities.register';
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
    player.spawn(36.19486618041992, 859.3850708007812, 197.71343994140625, 0);
    console.log(player.armour);
  }
}
