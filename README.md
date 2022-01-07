# Atix Labs Challenge

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

technical challenge from Atix Labs - REST API to write on shared log

## Run

```
npm ci
npm start
```

## Folders

- `config`
  App configuration

- `log`
  Empty folder to have a default place for logs

- `src`
  Source code

- `util`
  Scripts for _Stress Testing_ the API and CLI utilities

## Utils

- `util/post-log.mjs`
  Sends specifics messages to the API to produce, given an empty log, the very
  same results found on `st/logByHand`, which lines were made by hand

- `util/check-log.mjs`
  Runs through the log searching for the first line of a sequence (the one
  starting with zeroes) and verifies the whole chain of messages. Only checks
  for one chain. Shows a count for discarded lines, the ones that don't belong
  to the chain. Run it with `NODE_ENV=development` to see debug messages.

- `util/random-message-poster.mjs`
  Random message poster to stress test the API. Accepts two parameters:
  - `messageQuantity`: to set how many request you want to make
  - and `millisecondsDelay`: to set the delay between each API call

  ```
  node st/random-message-poster.mjs <messageQuantity> <millisecondsDelay>
  ```
- `util/stress-it.sh`
  Shell script to send concurrent request to the API with different amount of
  requests and different delays between requests. Edit it to your heart's
  content to test it harder. Ensure to make calls go to background.
