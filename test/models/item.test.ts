import { describe, expect, test, beforeEach } from "bun:test"
import { Item } from "../../src/models/item"
import {
  RawItem as RawItemType,
  Item as ItemType,
} from "../../src/types"

let rawItems: RawItemType[] = [
  { name: "item 1" },
  { name: "item 2" },
]

describe("static functionality", () => {
  test("without loadItems first, find doesn't return any result", () => {
    // TODO: Would need an actually deterministic ID here
    expect(Item.find("1")).toBe(undefined)
  })

  test("setItems enables find", () => {
    Item.loadItems([{ name: "item 1" }])
    const id = Array.from(Item.items.keys())[0]
    expect(Item.find(id)?.name).toBe(rawItems[0].name)
  })
})

describe("with loadItems already initialized", () => {
  beforeEach(() => {
    Item.loadItems(rawItems)
  })

  test("findByName returns the correct item", () => {
    expect(Item.findByName("item 1")?.name).toBe(rawItems[0].name)
  })

  test("findAll returns the correct items", () => {
    const ids = Array.from(Item.items.keys())
    const itemNames = Item.findAll(ids).map(item => item.name)
    const expectedItemNames = [rawItems[0].name, rawItems[1].name]
    expect(itemNames).toEqual(expectedItemNames)
  })

  test("findAll with empty array returns empty array", () => {
    expect(Item.findAll([])).toEqual([])
  })
})

describe("instance functionality", () => {
  test("getPropertyNames returns the correct property names", () => {
    const propertyItem = { name: "property 1" }
    const item = new Item({ name: "item 1", properties: [propertyItem] })
    expect(item.getPropertyNames()).toEqual(["property 1"])
  })
})