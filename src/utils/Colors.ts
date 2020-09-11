import { MapPlayer } from "w3ts/index";

export enum Colors {
  RED,
  BLUE,
  TEAL,
  PURPLE,
  YELLOW,
  ORANGE,
  GREEN,
  PINK,
  GRAY,
  LIGHT_BLUE,
  DARK_GREEN,
}
export const ColorCodes = {
  RED: "ff0000",
  BLUE: "0000ff",
  GREEN: "00ff00",
};
export const PlayerColors: Record<number, string> = {
  0: ColorCodes.RED, // red
  1: ColorCodes.BLUE, // blue
  2: "00ffff", // teal
  3: "6f2583", // purple
  4: "ffff00", // yellow
  5: "d45e19", // orange
  6: "00ff00", // green
  7: "ff8080", // pink
  8: "808080", // gray
  9: "8080ff", // light blue
  10: "008000", // dark green
};

const prefix = "|cff";
const suffix = "|r";
const colorizeString = (text: string, colorCode: string) =>
  prefix + colorCode + text + suffix;
export const colorizeStringWithPlayer = (text: string, playerId: number) =>
  colorizeString(text, PlayerColors[playerId]);
