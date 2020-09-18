import { Rectangle } from 'w3ts/index'

const prefs = [
  gg_rct_tower_area_p1,
  gg_rct_tower_area_p2,
  gg_rct_tower_area_p3,
  gg_rct_tower_area_p4,
  gg_rct_tower_area_p5,
  gg_rct_tower_area_p6,
  gg_rct_tower_area_p7,
  gg_rct_tower_area_p8,
]

export const Regions = {
  player: {
    workerSpawn: prefs.map(rect => Rectangle.fromHandle(rect)),
  },
}
