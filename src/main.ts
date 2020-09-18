/* eslint-disable @typescript-eslint/no-var-requires */
import { Unit, Trigger, MapPlayer } from 'w3ts'
import { Players } from 'w3ts/globals'
import { addScriptHook, W3TS_HOOK } from 'w3ts/hooks'
import { PremadeUnits } from 'units/units'
import { getActivePlayers } from 'players'
import { Log, LogLevel } from 'utils/Serilog/Serilog'
import { StringSink } from 'utils/Serilog/Sinks/StringSink'
import { colorizeStringWithPlayer } from 'utils/Colors'
import { Regions } from 'locations'
import { Sounds } from 'sounds'
import { Items } from 'items'

const BUILD_DATE = compiletime(() => new Date().toUTCString())
const TS_VERSION = compiletime(() => require('typescript').version)
const TSTL_VERSION = compiletime(() => require('typescript-to-lua').version)

//SetMapName('MapName123')
//SetMapDescription('Blablabla')

Log.Init([new StringSink(LogLevel.Debug, BJDebugMsg)])

// setup vars
const aiPlayers = {
  neutral: Players[10],
  creepsMiddle: Players[8],
  creesOuter: Players[9],
}
const activePlayers = getActivePlayers()
const points = {
  queen: [GetRectCenterX(gg_rct_queen), GetRectCenterY(gg_rct_queen)],
}
const patrons = []

// main stuff
function tsMain() {
  Log.Debug(`Build: ${BUILD_DATE}`)
  Log.Debug(`Typescript: v${TS_VERSION}`)
  Log.Debug(`Transpiler: v${TSTL_VERSION}`)

  // spawn sanctum
  const sanctum = new Unit(aiPlayers.neutral, FourCC(PremadeUnits.queen), points.queen[0], points.queen[1], 0)
  sanctum.name = 'Sanctum'
  sanctum.setAnimation('birth')

  Log.Debug('spawned sanctum')

  Object.keys(PremadeUnits.summoners).forEach(key => {
    const unitId = PremadeUnits.summoners[key]
    sanctum.addUnitToStock(FourCC(unitId), 1, 1)
  })

  // spawn invisible patrons for active players
  activePlayers.forEach(player => {
    const patron = new Unit(player, FourCC(PremadeUnits.hidden.patron), points.queen[0], points.queen[1], 0)
    patrons.push(patron)
    SelectUnitForPlayerSingle(sanctum.handle, player.handle)
    ResetToGameCameraForPlayer(player.handle, 1)
    Log.Debug(
      `spawned patron for player ${colorizeStringWithPlayer(player.name, player.id)}
    `
    )
  })

  Sleep(3)

  SetUserControlForceOn(GetPlayersAll())
  TriggerExecute(gg_trg_finish_loading)

  const sanctumTrg = new Trigger()
  sanctumTrg.registerUnitEvent(sanctum, EVENT_UNIT_SELL)
  sanctumTrg.addCondition(Condition(() => GetSellingUnit() === sanctum.handle))
  sanctumTrg.addAction(() => {
    const player = MapPlayer.fromHandle(GetOwningPlayer(GetBuyingUnit()))
    const summoner = Unit.fromHandle(GetSoldUnit())
    const destination = Regions.player[player.id].workerSpawn

    summoner.addItemById(FourCC(Items.campfire))
    PanCameraToForPlayer(player.handle, destination.centerX, destination.centerY)
    SelectUnitForPlayerSingle(summoner.handle, player.handle)
    PlaySoundOnUnitBJ(Sounds.action.player.buySummoner.handle, 1, summoner.handle)
  })
}

addScriptHook(W3TS_HOOK.MAIN_AFTER, tsMain)
