import type {
  Item as ItemType,
  RawItem as RawItemType,
  LocationMap as LocationMapType,
  Game as GameType,
  Location as LocationType,
  Targetable as TargetableType,
  Player as PlayerType,
  GameParameters as GameParametersType,
  Id,
  TargetableValidCommands,
  UntargetableValidCommands,
  ValidCommands,
} from "./types"

import {
  Location as LocationActions, Targetable
} from "./actions"
import { Location } from "./domains/location"
import { Item } from "./models/item"
// Data
import { items } from "./data/items"
import { locations} from "./data/locations"
import { map } from "./data/maps"
import { player } from "./data/players"

class Commands {
  private game: Game

  constructor(game: Game) {
    this.game = game
  }

  look() {
    if (!this.game.target) {
      const locationId = Location.id(this.game.currentLocation, this.game.locations)
      const adjacentLocationIds = Location.adjacentLocationIds(locationId, this.game.map)
      const locations = Location.findAll(adjacentLocationIds, this.game.locations)
      // refactor to use new visibleTargets function
      // const locations = this.game.visibleTargets()
      this.game.describeScene()
      console.log(`Seeing locations: ${locations.map(location => location.name)}`)
    } else {
      const reaction = Targetable.lookAt(this.game.target, this.game)
      console.log(reaction.message)
    }
  }

  target(targetable: TargetableType) {
    this.game.setTarget(targetable)
    this.game.describeStatus()
  }

  deselect() {
    this.game.setTarget(null)
  }

  move() {
    if (this.game.target) {
      const reaction = LocationActions.moveTo(this.game.target as LocationType, this.game)
      if (reaction.ok) {
        this.deselect()
      }
      console.log(reaction.message)
    } else {
      console.log("Select a target first to move to!")
    }
  }
}

const GameHelpers = {
  firstLocationName(map: LocationMapType) {
    const firstLocationName = Object.keys(map)[0]
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
  map: LocationMapType
  items: Map<Id, Item>
  player: PlayerType
  currentLocation: LocationType
  focussedItem: ItemType | null
  target: TargetableType | null
  currentTurn: number
  commands: Commands

  constructor(parameters: GameParametersType) {
    this.locations = parameters.locations
    this.map = parameters.map
    Item.loadItems(parameters.items)
    this.items = Item.items
    this.player = parameters.player
    const firstLocationName = GameHelpers.firstLocationName(this.map)
    this.currentLocation = Location.find(firstLocationName, this.locations)
    GameHelpers.addIdsFromRecord(this.locations)
    this.focussedItem = null
    this.target = null
    this.currentTurn = 1
    this.commands = new Commands(this)
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
    const commandNames = this.commandPropertyNames()
    if (commandNames.includes(input)) {
      this.nextTurn()
      if (this.target) {
        this.commands[input as TargetableValidCommands](this.target)
      } else {
        this.commands[input as UntargetableValidCommands]()
      }
    } else {
      const target = Location.findByName(input, this.locations) ?? Item.findByName(input)
      if (target) {
        this.commands.target(target)
      }
    }
  }
  
  describeScene() {
    console.log(`Current location: ${this.currentLocation.name}`)
    //console.log(`Visible items: ${this.currentLocation.items?.map(item => item.name)}`)
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

  destroyItem(id: Id) {
    this.items.delete(id)
    if (this.focussedItem && this.focussedItem.id === id) {
      this.focussedItem = null
    }
  }

  visibleTargets() {
    const locationId = Location.id(this.currentLocation, this.locations)
    const adjacentLocationIds = Location.adjacentLocationIds(locationId, this.map)
    const locations = Location.findAll(adjacentLocationIds, this.locations)
    const items = this.currentLocation.items ?? []
    return [...locations, ...items]
  }

  private nextTurn() {
    this.currentTurn += 1
  }

  private commandPropertyNames() {
    return Object.getOwnPropertyNames(Commands.prototype)
      .filter(name => typeof Commands.prototype[name as ValidCommands] === 'function' && name !== 'constructor')
  }
}

new Game(parameters).start()