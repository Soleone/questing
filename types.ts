export type Tag = string
export type Id = string

export type LocationMap = Record<string, string[]>

export type StateValues = boolean | number | string
export type State = {
  [key: string]: StateValues | State
}

export type Focusable = Item | Item[] | Location | Location[]
export type Targetable = Item | Location

export interface HasRawItems {
  items?: RawItem[]
}

export interface HasItems {
  items: Item[]
}

export type TargetableValidCommands = "target"
export type UntargetableValidCommands = "look" | "deselect" | "move"
export type ValidCommands = TargetableValidCommands | UntargetableValidCommands

// Currently unused
type InterfaceNames = "container"

interface Container {
  unlockChallenge?: (container: Item, game: Game) => boolean
}

interface InterfaceProperties extends Container {}
export type Interfaces = Record<string, InterfaceProperties>

export type ItemAction = (item: Item, game: Game) => Reaction

export interface Player extends HasItems {
  name: string
  stats: Record<string, number>
  tags: Tag[]
  actions: Record<string, (...args: any[]) => void>
}

export interface Item extends HasItems {
  id: Id
  name: string
  tags: Tag[]
  properties: Item[]
  image?: string
  description?: string
  state: State
  interfaces: Interfaces
  action?: ItemAction
  setState(key: string, value: StateValues | State): void
  getPropertyNames(): string[]
  getProperty(name: string): Item | undefined
  hasInterface(interfaceName: string): boolean
}

export interface RawItem extends HasRawItems {
  name: string
  tags?: Tag[]
  properties?: RawItem[]
  image?: string
  description?: string
  state?: State
  interfaces?: Interfaces
  action?: ItemAction
  // watch: Record<string, ()
}

export interface Location extends HasRawItems {
  name: string
}

export interface GameParameters {
  map: LocationMap
  locations: Record<string, Location>
  items: RawItem[]
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

export interface Game extends GameOperations {
  map: LocationMap
  player: Player
  // TODO: Change to use an indexed Map
  locations: Record<string, Location>
  items: Map<Id, Item>
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