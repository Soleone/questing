import type { Item, Game, IndexedList, Reaction } from "../types"

export const items: IndexedList<Item> = {
  desk: {
    name: "Desk",
    properties: [
      {
        name: "Drawer",
        tags: ["container"],
        items: [
          {
            name: "Lighter",
          }
        ],
        interfaces: {
          container: {
            // unlockChallenge(container: Item, game: Game) {
            //   return true
            // }
          },
          // usable: {
          //   use(item: Item, game: Game): Reaction {
          //     return {
          //       ok: true,
          //       message: "It's hot"
          //     }
          //   },
          // },
          // combinable: {
          //   combine(item: Item, other: Item, game: Game): Reaction {
          //     return {
          //       ok: true,
          //       message: `${other.name} gets quite hot`,

              
          //   }
          // }
        }
      }
    ],
  },
  paper: {
    name: "Paper",
    // reactions: {
    //   onFire(item: Item, game: Game) {
    //     console.log(`${item.name} evaporates. Good job!`)
    //     game.destroy(item.name)
    //   }
    // }
  }
}
