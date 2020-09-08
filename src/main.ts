/* eslint-disable @typescript-eslint/triple-slash-reference */
// This is necessary to bring in Lua and Ceres declarations into the scope
// Another alternative is to put these into the `types` array in `tsconfig.json`
/// <reference types="lua-types/5.3"/>
/// <reference types="ceres-decl/ceres"/>
/// //<reference types="./lib/core/blizzard"/>

import { Log, LogLevel } from './lib/Serilog/Serilog'
import { StringSink } from './lib/Serilog/Sinks/StringSink'
import { Creep } from './unit/creep'

const creeps = compiletime(() => {
  const creeps: Creep[] = []
  creeps.push(new Creep().setName('Nummer 1'))

  creeps.forEach(creep => {
    creep.id = 'x001'
    currentMap?.objects.unit.setObject(creep.id, creep.getUnit())
  })

  return creeps
})

Log.Init([new StringSink(LogLevel.Debug, BJDebugMsg)])

Log.Information('Hello World')
Log.Verbose('ASDF123!!!')
Log.Information(`${FourCC(creeps[0].id as string)}`)

//const player = Player(0)
//const unit = CreateUnit(player, FourCC('xxx1'), 500, 500, 0)

/*
ceres.addHook('reload::after', () => {
  Log.Init([new StringSink(LogLevel.Debug, BJDebugMsg)])

  function Main(this: void): void {
    Log.Information('Hello World')
    Log.Information(`${FourCC('I01T')}`)
    //Log.Information(`${DecodeFourCC(FourCC('I01T'))}`)

    const player = Player(1)
    const unit = CreateUnit(player, FourCC('xxx1'), 500, 500, 0)
  }

  function PrintError(err: any): void {
    Log.Fatal(err)
  }

  xpcall(
    () => {
      const init: trigger = CreateTrigger()
      TriggerRegisterTimerEvent(init, 0, false)
      TriggerAddAction(init, () =>
        xpcall(
          () => Main(),
          err => PrintError(err)
        )
      )
    },
    err => {
      PrintError(err)
    }
  )
})
*/
