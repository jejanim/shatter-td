-- Base class
local CreepCluster = class("CreepCluster")

function CreepCluster:Constructor(name, units, bosses)
    self.name   = name or ""
    self.units  = units or {}
    self.bosses = bosses or {}
end

function CreepCluster:addUnit(unit)
    self.units.insert(unit)
end

function CreepCluster:getUnits()
    return self.units
end

function CreepCluster:addBoss(unit)
    self.bosses.insert(unit)
end

function CreepCluster:getBosses()
    return self.bosses
end

return CreepCluster