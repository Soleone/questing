import { Map } from "../src/types"

export const map: Map = {
  start: ["path"],
  path: ["house", "town"],
  house: ["room1", "room2"],
  room2: ["room3"],
  town: ["house2"],
  house2: ["room4", "room5"],
  house3: ["room6", "room7"],
  room5: ["room6"],
  room6: ["room7"],
}