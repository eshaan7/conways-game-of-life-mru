# conways-game-of-life-mru

[Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) implemented as a Micro-Rollup using [@stackr/sdk](https://www.stackrlabs.xyz/).

## Demo

[![asciicast](https://asciinema.org/a/669693.svg)](https://asciinema.org/a/669693)

## Motivation

> The initial pattern constitutes the seed of the system. The first generation is created by applying the above rules simultaneously to every cell in the seed, live or dead; births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a tick.[nb 1] Each generation is a pure function of the preceding one. The rules continue to be applied repeatedly to create further generations.
- Taken from the wikipedia page.

Need I say more?

## Usage

### Setup

- `cp .env.example .env`
- Add `PRIVATE_KEY` in `.env`.
- You can configure some constants such as grid size in `src/constants.ts`.

### Run

```bash
$ bun run src/cli.ts
```
