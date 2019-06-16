print("spawn.lua loaded")
local Spawner = {}

function Spawner:spawnWave (amountOfUnits, unitId)
    local amountOfUnits = amountOfUnits or 20
    local unitId        = unitId or creepClusters[1].getUnits()[1]
    print("spawning wave of " .. amountOfUnits .. " units of type " .. unitId)

    for i = 0, amountOfUnits do
        spawnUnitForAllPlayers(unitId)
    end
end

function Spawner:spawnUnitForAllPlayers (unitId)
    local unitId = unitId or error("no unitId provided!")

    for _, player in ipairs(GetPlayersByMapControl(MAP_CONTROL_USER)) do
        local playerId    = GetPlayerId(player)
        local location    = udg_point_spawn[playerId]
        local owner       = playerId <= 4 and Player(8) or Player(9)
        local createdUnit = CreateUnitAtLoc(owner, unitid, location, bj_UNIT_FACING)
        print("spawned 1 unit of type " .. unitId .. " for player " .. playerId)
        GroupAddUnit(udg_unitgrp_all_creeps, createdUnit)
    end
    
end

return Spawner