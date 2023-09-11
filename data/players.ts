import type { Player, Item as ItemType, Game } from "../src/types"
import { Item as ItemActions, Container } from "../src/actions"

export const player: Player = {
  name: "Player",
  stats: {
    weightLimit: 20
  },
  tags: [],
  items: [],
  actions: {
    containerCheck(item: ItemType, game: Game) {
      if (item.hasInterface("container")) {
        return Container.open(item, game)
      }
    }
  }
}