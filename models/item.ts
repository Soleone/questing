import type { Item as ItemType, IndexedList, StateValues, State } from "../types"

export class Item {
  private static items: IndexedList<ItemType>
  private item: ItemType

  static setItems(items: IndexedList<ItemType>) {
    this.items = items
  }
  
  static find(id: string) {
    return this.items && this.items[id]
  }
  
  static findByName(name: string) {
    return Object.values(this.items).find(item => item.name === name)
  }
  
  static findAll(ids: string[]) {
    return ids.map(id => this.items[id])
  }
  
  static id(item: ItemType) {
    const itemId = Object.keys(this.items).find(id => this.items[id] === item)
    if (!itemId) throw new Error("No item with this ID")
    return itemId
  }

  constructor(item: ItemType) {
    this.item = item
  }

  getPropertyNames() {
    return this.item.properties?.map(property => property.name)
  }

  getProperty(propertyName: string) {
    return this.item.properties?.find(property => property.name === propertyName)
  }

  hasTag(tag: string) {
    return this.item.tags?.includes(tag)
  }

  hasInterface(interfaceName: string) {
    return Object.keys(this.item.interfaces ?? {}).includes(interfaceName)
  }

  setState(name: string, value: StateValues | State) {
    if (!this.item.state) {
      this.item.state = {}
    }
    this.item.state[name] = value
  }
}