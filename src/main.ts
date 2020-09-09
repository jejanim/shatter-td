import { Timer, Unit, CameraSetup } from "w3ts";
import { Players } from "w3ts/globals";
import { addScriptHook, W3TS_HOOK } from "w3ts/hooks";
import { PremadeUnits } from "units/units";
import { getActivePlayers } from "players";
import { Log, LogLevel } from "utils/Serilog/Serilog";
import { StringSink } from "utils/Serilog/Sinks/StringSink";

const BUILD_DATE = compiletime(() => new Date().toUTCString());
const TS_VERSION = compiletime(() => require("typescript").version);
const TSTL_VERSION = compiletime(() => require("typescript-to-lua").version);

Log.Init([new StringSink(LogLevel.Debug, BJDebugMsg)]);

// setup vars
const aiPlayers = {
  neutral: Players[10],
  creepsMiddle: Players[8],
  creesOuter: Players[9],
};
const activePlayers = getActivePlayers();
const points = {
  queen: [GetRectCenterX(gg_rct_queen), GetRectCenterY(gg_rct_queen)],
};
const patrons = [];

// main stuff
function tsMain() {
  Log.Debug(`Build: ${BUILD_DATE}`);
  Log.Debug(`Typescript: v${TS_VERSION}`);
  Log.Debug(`Transpiler: v${TSTL_VERSION}`);

  // spawn sanctum
  const sanctum = new Unit(
    aiPlayers.neutral,
    FourCC(PremadeUnits.queen),
    points.queen[0],
    points.queen[1],
    0
  );
  sanctum.name = "Sanctum";
  sanctum.setAnimation("birth");

  Log.Debug("spawned sanctum");

  Object.keys(PremadeUnits.summoners).forEach(key => {
    let unitId = PremadeUnits.summoners[key];
    sanctum.addUnitToStock(FourCC(unitId), 1, 1);
  });

  // spawn invisible patrons for active players
  getActivePlayers().forEach(player => {
    let patron = new Unit(
      player,
      FourCC(PremadeUnits.hidden.patron),
      points.queen[0],
      points.queen[1],
      0
    );
    patrons.push(patron);
    SelectUnitForPlayerSingle(sanctum.handle, player.handle);
    ResetToGameCameraForPlayer(player.handle, 1);
    Log.Debug("Player color: ", GetPlayerColor(player.handle).__handle);
    Log.Debug(
      "spawned patron for player " +
        GetPlayerColor(player.handle).__playercolor +
        player.name
    );
  });

  Sleep(1);

  SetUserControlForceOn(GetPlayersAll());
  TriggerExecute(gg_trg_finish_loading);

  /*
  new Timer().start(1.0, true, () => {
    unit.color = Players[math.random(0, bj_MAX_PLAYERS)].color;
  });
  */
}

addScriptHook(W3TS_HOOK.MAIN_AFTER, tsMain);
