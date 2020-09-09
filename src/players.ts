import { config } from "config/config";
import { Players } from "w3ts/globals/index";
import { MapPlayer } from "w3ts/index";

export const getActivePlayers = (): MapPlayer[] => {
  const activePlayers: MapPlayer[] = [];

  for (let index = 0; index < config.players.maxPlayers; index++) {
    let player = Players[index];
    if (IsPlayerSlotState(player.handle, PLAYER_SLOT_STATE_PLAYING)) {
      activePlayers.push(player);
    }
  }

  return activePlayers;
};
