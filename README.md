<div align="center">
<img src="./src/assets/tile_cover.svg" alt="GemHunter-AO Logo">

# GemHunter-AO

</div>

<p align="center">
  <img src="./src/assets/gemhunter1.png" alt="GemHunter-AO Game" width="100%">
</p>
<p align="center">
  <img src="./src/assets/gemhunter2.png" alt="GemHunter-AO Loss The Game" width="100%">
</p>

<p align="center">GemHunter-AO is a thrilling grid-based gambling game built on Arweave AO where players strategically navigate through a minefield of their own creation. Set your stakes, choose your mine count, and hunt for diamonds while avoiding the bombs you placed - each successful move increases your potential rewards!</p>

## [Live Demo](https://gem-hunter-ao.vercel.app/)


# Index

- [GemHunter-AO](#gemhunter-ao)
- [Live Demo](#live-demo)
- [Index](#index)
- [Introduction](#introduction)
  - [Techstack](#techstack)
  - [Key Features](#key-features)
- [How to setup](#how-to-setup)
  - [Clone the repo](#clone-the-repo)
  - [Install dependencies](#install-dependencies)
  - [ArConnect Wallet](#arconnect-wallet)
- [Finally run the webapp](#finally-run-the-webapp)
- [License](#license)

# Introduction

GemHunter-AO brings the classic minesweeper concept into the world of blockchain gaming with an exciting twist - players set their own difficulty by choosing how many mines to play against. Built on Arweave's AO platform, this 5x5 grid-based game combines strategy, risk management, and the thrill of increasing rewards with each successful move.

**[Try it out here!](https://gem-hunter-ao.vercel.app/)**

The game mechanics are elegantly simple yet deeply engaging: place your mines, set your stake, and start hunting for diamonds. Each successful tile reveal increases your potential winnings, but one wrong move could cost you everything. Will you play it safe and cash out early, or risk it all for bigger rewards?

## Techstack
     
    - Vite + ReactJS with Javascript
    - TailwindCSS
    - LUA (lsqlite3)
    - AO Connect
    - Arweave-wallet-kit
    - Shadcn

## Key Features

### Customizable Risk Levels
- Choose your own mine count (higher count = higher potential rewards)
- Strategic mine placement for personalized gameplay
- Dynamic reward multiplier based on mine count (mines÷10 + 1)

### Progressive Rewards System
- Initial reward calculation: (mines÷10 + 1) × stake amount
- Incremental increase of 0.002× per successful tile reveal
- Flexible cash-out option available at any time

### Interactive Gameplay
- 5×5 grid offering 25 possible positions
- Real-time reward calculation and display
- Instant win/loss feedback
- Simple and intuitive user interface

### Smart Contract Integration
- Secure stake management
- Transparent reward distribution
- Verifiable randomness for mine placement

### Player Control
- Choose when to end the game and collect rewards
- Strategic decision-making between risk and reward
- Real-time tracking of potential winnings

# How to setup
## Clone the repo

Fork and clone the repo

```bash
git clone git@github.com:AAshu1412/GemHunter-AO.git
cd GemHunter-AO
```

## Install dependencies

```bash
npm install
```
## ArConnect Wallet
If you don't have ArConnect Wallet then [click here](https://www.arconnect.io/download) to download the wallet on your browser.

After downloading the wallet setup your wallet to use the AO_DATABASE

# Finally run the webapp

```bash
npm run dev
```

The webapp will be running on `localhost:5173`

To open the same application of another device for testing purposes, make sure that the device is connected to the same network as the device on which the webapp is running. Then visit `http://<IP_ADDRESS_OF_THE_DEVICE_RUNNING_THE_WEBAPP>:5173`

# License

The projects is licensed under [MIT](https://choosealicense.com/licenses/mit/)
