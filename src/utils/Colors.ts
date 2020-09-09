import { MapPlayer } from "w3ts/index";

export const Colors = {};
export const PlayerColors: Record<number, string> = {
  0: "ff0000",
  1: "0000ff",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
  7: "",
  8: "",
  9: "",
  10: "",
  11: "",
};

const prefix = "|cff";
const suffix = "|r";
const colorizeString = (text: string, colorCode: string) =>
  prefix + colorCode + text + suffix;
const colorizeStringWithPlayer = (text: string, playerId: number) =>
  colorizeString(text, PlayerColors[playerId]);
