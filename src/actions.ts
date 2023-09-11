import type {
  Item as ItemType,
  Location as LocationType,
  Targetable as TargetableType,
  Reaction,
  Game,
} from "./types"

import {Location as LocationHelper} from "./domains/location"

export const Item = {
}

export const Container = {
  open(container: ItemType, game: Game): Reaction {
    console.log(`Seeing items: ${container.items?.map(item => item.name)}`)
    if (container.state?.locked) {
      return {
        ok: false,
        message: `${container.name} is locked.`
      }
    } else {
      return {
        ok: true,
        message: `${container.name} was opened.`,
        focus: container.items,
        result: (game) => {
          container.setState("open", true)
        }
      }
    }
  },
  unlock(container: ItemType, game: Game): Reaction {
    if (container.state?.locked) {
      // const challenge = () => { true }
      // solveUnlockChallenge(challenge)
      const challenge = container.interfaces.container?.unlockChallenge
      if (challenge) {
        const challengeSuccess = challenge(container, game)
        if (challengeSuccess) {
          container.setState("locked", false)
          return {
            ok: true,
            message: "The lock opened."
          }
        } else {
          return {
            ok: false,
            message: "Failed to open the lock."
          }
        }
      } else {
        return {
          ok: true,
          message: "It just magically opens by itself. Ok..."
        }
      }
    } else {
      return {
        ok: true,
        message: "{this} is already unlocked."
      }
    }

  }
}

export const Location = {
  moveTo(to: LocationType, game: Game): Reaction {
    const toId = LocationHelper.id(to, game.locations)
    const currentLocationId = LocationHelper.id(game.currentLocation, game.locations)
    if (LocationHelper.isAdjacentLocation(toId, currentLocationId, game.map)) {
      game.setCurrentLocation(to)
      return {
        ok: true,
        message: `Moved to ${game.currentLocation.name}`
      }
    } else {
      return {
        ok: true,
        message: "",
        result: () => {

        }
      }
    }
  }
}

export const Targetable = {
  lookAt(target: TargetableType, game: Game): Reaction {
    const name = target.name
    const propertyNames = "properties" in target ? (target as ItemType).getPropertyNames() : null
    // TODO: Fix error here: undefined is not an object (evaluating 'item.name')
    const itemNames = target.items?.map(item => item.name)
    const output = [name, propertyNames, itemNames]
    return {
      ok: true,
      message: output.filter(part => part).join("\n")
    }
  }
}