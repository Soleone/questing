import crypto from 'node:crypto'

import type {
  Item as ItemType,
  RawItem as RawItemType,
  StateValues,
  State,
  Tag,
  Interfaces,
  ItemAction,
  Id,
} from "../types"

export class Item implements ItemType {
  private static rawItems: RawItemType[]
  static items: Map<Id, Item>
  
  id: Id
  name: string
  tags: Tag[]
  image?: string
  description?: string
  state: State
  interfaces: Interfaces
  action?: ItemAction
  properties: ItemType[]
  items: ItemType[]

  static loadItems(items: RawItemType[]) {
    this.rawItems = items
    this.items = new Map()
    this.rawItems.forEach(rawItem => {
      let item = new Item(rawItem)
      this.items.set(item.id, item)
    })
  }
  
  static find(id: Id): ItemType | undefined {
    return this.items && this.items.get(id)
  }
  
  static findByName(name: string): ItemType | undefined {
    return Array.from(this.items.values()).find(item => item.name === name)
  }
  
  static findAll(ids: Id[]): ItemType[] {
    const itemMatches = ids.map(id => this.items.get(id))
    const existingItems = itemMatches.filter(item => item !== undefined) as ItemType[]
    return existingItems
  }
  
  constructor(item: RawItemType) {
    this.id = this.generateId()
    this.name = item.name
    this.tags = item.tags ?? []
    this.image = item.image
    this.description = item.description
    this.state = item.state ?? {}
    this.interfaces = item.interfaces ?? {}
    this.action = item.action
    if (!Item.items.get(this.id)) {
      Item.items.set(this.id, this)
    }
    this.properties = item.properties?.map(property => new Item(property)) ?? []
    this.items = item.items?.map(property => new Item(property)) ?? []
  }

  getPropertyNames(): string[] {
    return this.properties.map(property => property.name)
  }

  getProperty(propertyName: string): ItemType | undefined {
    return this.properties.find(property => property.name === propertyName)
  }

  hasTag(tag: string): boolean {
    return this.tags.includes(tag)
  }

  hasInterface(interfaceName: string): boolean {
    return Object.keys(this.interfaces).includes(interfaceName)
  }

  setState(name: string, value: StateValues | State): void {
    if (!this.state) {
      this.state = {}
    }
    this.state[name] = value
  }

  private generateId(): string {
    return crypto.randomBytes(8).toString('hex')
  }
}