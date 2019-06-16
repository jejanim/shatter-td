-- globals
Spawner = require('utils.spawn')

local CreepCluster = require('class.CreepCluster')

creepClusters = {}

print("create skeletons")
local skeletons = CreepCluster:new(
    "skeletons", 
    {"h00s", "h04W", "h00O", "h00R"}, 
    {"h04N"})

print("create demons")
local demons = CreepCluster:new(
    "demons", 
    {"h02H", "h02F", "h02I", "h04K", "h04M", "h026"}, 
    {"h00W"})

table.insert(creepClusters, skeletons)
table.insert(creepClusters, demons)