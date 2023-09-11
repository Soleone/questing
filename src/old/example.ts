import { items } from "../../data/items"
import { Item } from "../models/item"


export function exampleCode() {
  Item.loadItems(items)
  const item = Item.findByName("Desk") as Item
  console.log(`Reading property names of ${item.name}`)
  const propNames = item.getPropertyNames()
  console.log(`Reading first property name of ${propNames}`)
  const firstPropName = propNames && propNames[0]
  if (firstPropName) {
    console.log(`Getting first property named ${firstPropName}`)
    const firstProp = item.getProperty(firstPropName)
    if (firstProp) {
      console.log(`Got first property named ${firstProp?.name}`)
    }
  }
}

exampleCode()