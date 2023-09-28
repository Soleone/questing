![Tests status](https://github.com/Soleone/questing/actions/workflows/bun.yml/badge.svg)
![MIT license](https://img.shields.io/github/license/Soleone/questing)
![Last commit](https://img.shields.io/github/last-commit/Soleone/questing/main)

# Questing

A game framework to build extensible player interactions. Developed to run in the [Bun](https://bun.sh) environment.

## Usage

1. Install Bun
2. Clone repo
3. `bun install`
4. `bun src/game.ts`

## Fundamentals

- Players move between Locations
- Locations can have items (e.g. furniture)
- Items can have sub-items (independent of the parent item) and properties (part of the parent item)
- LocationMap links locations together to determine connections
- Actions take a Game as arguments (to be able to act on anything) and return a Reaction

## Features

- [x] Targetting (location to move, item from inventory to combine with location item)
- [x] Moving between locations
- [x] Item state

## TODO

- [ ] Item definitions vs item instances (e.g. multiple batteries)
- [ ] Immediately show adjacent locations when looking around
- [ ] Select property and open it
- [ ] Pick up items
- [ ] Focussing items
- [ ] Readable Pages and Books
- [ ] Look around
  - location
  - description
  - adjacent locations
  - items
- [ ] Openable containers that have their items hidden otherwise
- [ ] Turn into visual Remix app
- [ ] More tests

## Contributing

- `bun test` to run all tests
- You can play around in `src/old/example.ts` to get started
