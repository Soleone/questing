# Hacker Game (codename)

A game framework to build extensible player interactions. Developed to run in the [Bun](https://bun.sh) environment.

## Usage

1. Install Bun
2. Clone repo
3. Run `bun game.ts`

## Fundamentals

- Actions take a Game as arguments (to be able to act on anything) and return a Reaction

## Features

- [x] Targetting (location to move, item from inventory to combine with location item)
- [x] Moving between locations
- [x] Item state

## TODO

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
- [ ] Tests
