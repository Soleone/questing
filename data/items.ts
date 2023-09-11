import type { RawItem } from "../src/types"

export const items: RawItem[] = [
  {
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
          //   action(item: Item, game: Game): Reaction {
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
  {
    name: "Paper",
    description: "The paper reads the following: The lighter is in the desk in the house at the end of the path.",
    // reactions: {
    //   onFire(item: Item, game: Game) {
    //     console.log(`${item.name} evaporates. Good job!`)
    //     game.destroy(item.name)
    //   }
    // }
  }
]
