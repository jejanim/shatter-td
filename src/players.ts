import { config } from "config/config";

export const getActivePlayers = () => {
  const activePlayers = [];

  for (let index = 0; index < config.players.maxPlayers; index++) {
    let player = Player(index);
    if (IsPlayerSlotState(player, PLAYER_SLOT_STATE_PLAYING)) {
      activePlayers.push(player);
    }
  }

  return activePlayers;
};
