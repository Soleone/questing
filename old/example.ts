import { Item } from "../domains/item"
import { items } from "../data/items"

export function exampleCode() {
  const item = items.desk
  console.log(`Reading property names of ${item.name}`)
  const propNames = Item.getPropertyNames(item)
  console.log(`Reading first property name of ${propNames}`)
  const firstPropName = propNames && propNames[0]
  if (firstPropName) {
    console.log(`Getting first property named ${firstPropName}`)
    const firstProp = Item.getProperty(item, firstPropName)
    if (firstProp) {
      console.log(`Got first property named ${firstProp?.name}`)
    }
  }
}

exampleCode()