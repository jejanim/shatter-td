import { Creep } from './unit/creep'

export const init = () => {
  const creeps = []
  creeps.push(new Creep().setName('Nummer 1'))

  creeps.forEach(creep => currentMap?.objects.unit.setObject('xxx1', creep.getUnit()))

  currentMap?.objects.unit.getObject
}
