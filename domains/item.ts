import type { Item as ItemType, IndexedList, StateValues, State } from "../types"

export const Item = {
  // TODO: Abstract and DRY between indexed locations and items
  find(id: string, items: IndexedList<ItemType>) {
    return items[id]
  },
  findByName(name: string, items: IndexedList<ItemType>) {
    return Object.values(items).find(item => item.name === name)
  },
  findAll(ids: string[], items: IndexedList<ItemType>) {
    return ids.map(id => items[id])
  },
  id(item: ItemType, items: IndexedList<ItemType>) {
    const itemId = Object.keys(items).find(id => items[id] === item)
    if (!itemId) throw new Error("No item with this ID")
    return itemId
  },
  getPropertyNames(item: ItemType) {
    return item.properties?.map(property => property.name)
  },
  getProperty(item: ItemType, propertyName: string) {
    return item.properties?.find(property => property.name === propertyName)
  },
  hasTag(item: ItemType, tag: string) {
    return item.tags?.includes(tag)
  },  
  hasInterface(item: ItemType, interfaceName: string) {
    return Object.keys(item.interfaces ?? {}).includes(interfaceName)
  },
  setState(item: ItemType, name: string, value: StateValues | State) {
    if (!item.state) {
      item.state = {}
    }
    item.state[name] = value
  }
}