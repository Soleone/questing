import { Location as LocationType, IndexedList, Map } from "../types"

export const Location = {
  find(id: string, locations: IndexedList<LocationType>) {
    return locations[id]
  },
  findByName(name: string, locations: IndexedList<LocationType>) {
    return Object.values(locations).find(location => location.name === name)
  },
  findAll(ids: string[], locations: IndexedList<LocationType>) {
    return ids.map(id => locations[id])
  },
  id(location: LocationType, locations: IndexedList<LocationType>) {
    const locationId = Object.keys(locations).find(id => locations[id] === location)
    if (!locationId) throw new Error("No location with this ID")
    return locationId
  },
  adjacentLocationIds(locationId: string, map: Map) {
    const right_locations = map[locationId] ?? []
    const left_locations = Object.keys(map).filter(location => map[location].includes(locationId))
    return [...left_locations, ...right_locations]
  },
  isAdjacentLocation(from: string, to: string, map: Map) {
    return this.adjacentLocationIds(from, map).includes(to)
  }
}