import { AbilityIds } from '../ability/abilities'

export enum ArmorClass {
  NO_ARMOR = 'none',
  SMALL = 'small',
  NORMAL = 'normal',
  MEDIUM = 'medium',
  LARGE = 'large',
  FORTIFIED = 'fort',
  HERO = 'hero',
  DIVINE = 'divine'
}

export class Creep {
  id: string | undefined

  // props
  name = 'Creep'

  baseHealth = 10
  healthRegen = 0.0
  baseMana = 0
  maxMana = 0
  manaRegen = 0.0

  size = 1.0

  modelFile = 'units\\undead\\Skeleton\\Skeleton.mdl'
  icon = 'ReplaceableTextures\\CommandButtons\\BTNSkeletonWarrior.blp'

  movementSpeed = 200

  goldBounty = 0

  armorClass = ArmorClass.NO_ARMOR
  armorAmount = 0

  sound = 'Skeleton'

  abilities: string[] = [AbilityIds.Ghost, AbilityIds.GhostVisible]
  private unit: WarObject

  constructor() {
    this.unit = currentMap?.objects.unit.getObject('hfoo').clone() as WarObject
  }

  private savePropsToUnit(): void {
    this.unit.setField('Name', this.name)
    this.unit.setField('HP', this.baseHealth)
    this.unit.setField('mana0', this.baseMana)
    this.unit.setField('manaN', this.maxMana)
    this.unit.setField('regenHP', this.healthRegen)
    this.unit.setField('regenMana', this.manaRegen)
    this.unit.setField('bountyplus', this.goldBounty)
    this.unit.setField('bountydice', 0)
    this.unit.setField('bountysides', 0)
    this.unit.setField('unitSound', this.sound)
    this.unit.setField('collision', 0.0)
    this.unit.setField('spd', this.movementSpeed)
    this.unit.setField('defType', this.armorClass)
    this.unit.setField('def', this.armorAmount)
    this.unit.setField('modelScale', this.size)
    this.unit.setField('file', this.modelFile)
    this.unit.setField('Art', this.modelFile)
    this.unit.setField('abilList', this.abilities.join(','))
  }

  getUnit(): WarObject {
    this.savePropsToUnit()
    return this.unit
  }

  /**
   * A field used purely within the editor, defining the name of the unit/building/hero.
   * @param name
   */
  setName(name: string): Creep {
    this.name = name
    return this
  }
}
