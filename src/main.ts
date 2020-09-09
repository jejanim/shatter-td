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

//Log.Init([new StringSink(LogLevel.Debug, )]);

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

// main stuff
function tsMain() {
  print(`Build: ${BUILD_DATE}`);
  print(`Typescript: v${TS_VERSION}`);
  print(`Transpiler: v${TSTL_VERSION}`);
  print(" ");

  const patrons = [];

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

  print("spawned sanctum");

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
    SelectUnitForPlayerSingle(sanctum.handle, player.handle);
    patrons.push(patron);
    ResetToGameCameraForPlayer(player.handle, 1);
    print(
      "spawned patron for player " + GetPlayerColor(player.handle) + player.name
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
