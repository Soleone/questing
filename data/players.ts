import type { Player, Item as ItemType, Game } from "../types"
import { Item } from "../domains/item"
import { Item as ItemActions, Container } from "../actions"

export const player: Player = {
  name: "Player",
  stats: {
    weightLimit: 20
  },
  tags: [],
  items: [],
  actions: {
    containerCheck(item: ItemType, game: Game) {
      if (Item.hasInterface(item, "container")) {
        return Container.open(item, game)
      }
    }
  }
}