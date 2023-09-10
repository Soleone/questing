import { describe, expect, test, beforeAll } from "bun:test"
import { Item } from "../../models/item"
import { Item as ItemType } from "../../types"

let items: Record<string, ItemType>

beforeAll(() => {
  items = {
    "1": { name: "item 1" },
    "2": { name: "item 2" }
  }
})

describe("static functionality", () => {
  test("without setItems first, find doesn't return any result", () => {
    expect(Item.find("1")).toBe(undefined)
  })

  test("setItems enables find", () => {
    
    Item.setItems(items)
    expect(Item.find("1")).toBe(items["1"])
  })
})

describe("with setItems already initialized", () => {
  test("findByName returns the correct item", () => {
    expect(Item.findByName("item 1")).toBe(items["1"])
  })

  test("findAll returns the correct items", () => {
    expect(Item.findAll(["1", "2"])).toEqual([items["1"], items["2"]])
  })

  test("findAll with empty array returns empty array", () => {
    expect(Item.findAll([])).toEqual([])
  })

  test("id returns the correct id", () => {
    expect(Item.id(items["1"])).toBe("1")
  })

  test("id throws an error if the item is not found", () => {
    expect(() => Item.id({ name: "not found" })).toThrow("No item with this ID")
  })
})

describe("instance functionality", () => {
  test("getPropertyNames returns the correct property names", () => {
    const propertyItem = { name: "property 1" }
    const item = new Item({ name: "item 1", properties: [propertyItem] })
    expect(item.getPropertyNames()).toEqual(["property 1"])
  })
})