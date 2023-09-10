export type Tag = string

export type Map = Record<string, string[]>

export type StateValues = boolean | number | string
export type State = {
  [key: string]: StateValues | State
}

export type Focusable = Item | Item[] | Location | Location[]
export type Targetable = Item | Location

export interface HasItems {
  items?: Item[]
}

type InterfaceNames = "container"

interface Container {
  unlockChallenge?: (container: Item, game: Game) => boolean
}

interface InterfaceProperties extends Container {}

export interface Player extends HasItems {
  name: string
  stats: Record<string, number>
  tags: Tag[]
  actions: Record<string, (...args: any[]) => void>
}

export interface Item extends HasItems {
  name: string
  tags?: Tag[]
  properties?: Item[]
  image?: string
  description?: string
  state?: State
  interfaces?: Record<InterfaceNames, InterfaceProperties>
  use?: (item: Item, game: Game) => Reaction
  // watch: Record<string, ()
}

export interface Location extends HasItems {
  name: string
}

export interface GameParameters {
  map: Map
  locations: Record<string, Location>
  items: Record<string, Item>
  player: Player
}

export interface GameOperations {
  setCurrentLocation: (location: Location) => void
  setFocussedItem: (item: Item) => void
  setTarget: (targetable: Targetable) => void
  destroyItem: (id: string) => void
  describeScene: () => void
  describeStatus: () => void
}

export interface Game extends GameParameters, GameOperations {
  currentLocation: Location
  focussedItem: Item | null
  target: Targetable | null
  [key: string]: any
}

export type Reaction = {
  ok: boolean
  message: string
  result?: (game: Game) => void
  focus?: Focusable
}

export type IndexedList<T> = Record<string, T>