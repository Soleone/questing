import type {
  Item as ItemType,
  Map as MapType,
  Game as GameType,
  Location as LocationType,
  Targetable as TargetableType,
  Player as PlayerType,
  GameParameters as GameParametersType,
} from "./types"

import {
  Location as LocationActions, Targetable
} from "./actions"
import { Location } from "./domains/location"
import { Item } from "./domains/item"
// Data
import { items } from "./data/items"
import { locations} from "./data/locations"
import { map } from "./data/maps"
import { player } from "./data/players"

const Commands = {
  look(game: Game) {
    if (!game.target) {
      const locationId = Location.id(game.currentLocation, game.locations)
      const adjacentLocationIds = Location.adjacentLocationIds(locationId, game.map)
      const locations = Location.findAll(adjacentLocationIds, game.locations)
      game.describeScene()
      console.log(`Seeing locations: ${locations.map(location => location.name)}`)
    } else {
      const reaction = Targetable.lookAt(game.target, game)
      console.log(reaction.message)
    }
  },
  target(game: Game, targetable: TargetableType) {
    game.setTarget(targetable)
    game.describeStatus()
  },
  deselect(game: Game) {
    game.setTarget(null)
  },
  move(game: Game) {
    if (game.target) {
      const reaction = LocationActions.moveTo(game.target as LocationType, game)
      if (reaction.ok) {
        Commands.deselect(game)
      }
      console.log(reaction.message)
    } else {
      console.log("Select a target first to move to!")
    }
  }
}

const GameHelpers = {
  firstLocationName(game: GameType) {
    const firstLocationName = Object.keys(game.map)[0]
    return firstLocationName
  },
  addIdsFromRecord(record: Record<string, Record<string, any>>) {
    const keys = Object.keys(record)
    keys.forEach(key => record[key].id = key)
  }
}

const parameters: GameParametersType = {
  locations,
  map,
  items,
  player
}

class Game implements GameType {
  locations: Record<string, LocationType>
  map: MapType
  items: Record<string, ItemType>
  player: PlayerType
  currentLocation: LocationType
  focussedItem: ItemType | null
  target: TargetableType | null
  currentTurn: number

  constructor(parameters: GameParametersType) {
    this.locations = parameters.locations
    this.map = parameters.map
    this.items = parameters.items
    this.player = parameters.player
    const firstLocationName = GameHelpers.firstLocationName(this)
    this.currentLocation = Location.find(firstLocationName, this.locations)
    GameHelpers.addIdsFromRecord(this.locations)
    GameHelpers.addIdsFromRecord(this.items)
    this.focussedItem = null
    this.target = null
    this.currentTurn = 1
  }

  async start() {
    this.describeScene()
    this.loop()
  }
  
  async loop() {
    this.displayPrompt()
    for await (const command of console) {
      console.log("\n-----------------------------------------------------")
      this.processCommand(command)
      this.displayPrompt()
    }
  }

  displayPrompt() {
    console.log("\n-----------------------------------------------------")
    console.log(`Turn ${this.currentTurn}`)
    console.log("You can type the name of something to select it.")
    console.log("Or use the following actions, depending on your target:")
    console.log("- look")
    console.log("- move")
    console.log("- deselect")
    process.stdout.write("\nWhat do you do: ")
  }

  processCommand(input: string) {
    const commandNames = Object.keys(Commands)
    if (commandNames.includes(input)) {
      this.nextTurn()
      const commandAction = Commands[input]
      if (commandAction) {
        if (this.target) {
          commandAction(this, this.target)
        } else {
          commandAction(this)
        }
      } else {
        console.log("Don't understand this command!")
      }
    } else {
      const target = Location.findByName(input, this.locations) || Item.findByName(input, this.items)
      if (target) {
        Commands.target(this, target)
      }
    }
  }
  
  describeScene() {
    console.log(`Current location: ${this.currentLocation.name}`)
    console.log(`Visible items: ${this.currentLocation.items?.map(item => item.name)}`)
  }
  
  describeStatus() {
    if (this.target) {
      console.log(`Target: ${this.target?.name}`)
    }
    if (this.focussedItem) {
      console.log(`Focussed Item: ${this.focussedItem?.name}`)
    }
  }
  
  setFocussedItem(item: ItemType) {
    this.focussedItem = item
    //console.log(`Focussing item ${item.name}`)
  }

  setCurrentLocation(location: LocationType) {
    this.currentLocation = location
    //console.log(`Changing location to ${location.name}`)
  }

  setTarget(targetable: TargetableType | null) {
    this.target = targetable
    //console.log(`Setting target to ${targetable?.name}`)
  }

  destroyItem(id: string) {
    delete this.items[id]
    if (this.focussedItem && Item.id(this.focussedItem, this.items) === id) {
      this.focussedItem = null
    }
  }

  nextTurn() {
    this.currentTurn += 1
  }
}

new Game(parameters).start()