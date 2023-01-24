import { log, Player } from 'alt-server';
import { EntitiesRegister } from '../../libs/database/entities.register';


export class UserService {
  constructor(private dbProvider = EntitiesRegister) {}
  onPlayerConnect(player: Player) {
    log(`[${player.id}] ${player.name} has connected to the server.`);
    // Récupérer le joueur depuis la base de données

    player.model = 'mp_m_freemode_01';
    player.spawn(36.19486618041992, 859.3850708007812, 197.71343994140625, 0);
    console.log(player.armour)
  }
}
