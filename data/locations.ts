import type { IndexedList, Location } from "../src/types"
import { items } from "./items"

export const locations: IndexedList<Location> = {
  start: {
    name: "Start",
    items: [items.paper]
  },
  path: {
    name: "Path",
    items: [],  
  },
  house: {
    name: "House",
    items: [],  
  },
  house2: {
    name: "House 2",
    items: [],  
  },
  house3: {
    name: "House 3",
    items: [],  
  },
  room1: {
    name: "Room",
    items: [items.desk],  
  },
  room2: {
    name: "Room 2",
    items: [],  
  },
  room3: {
    name: "Room 3",
    items: [],
  },
  room4: {
    name: "Room 3",
    items: [],
  },
  room5: {
    name: "Room 3",
    items: [],
  },
  room6: {
    name: "Room 3",
    items: [],
  },
  room7: {
    name: "Room 3",
    items: [],
  },
  town: {
    name: "Town",
    items: [],
  },
}