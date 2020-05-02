import { Game } from "./game";
import { Deck } from './deck';
import { fisherYates } from './shuffle/fisher-yates';
import { Card } from './card';
import fs from 'fs';

if (!fs.existsSync('./config.json')) {
    console.error('Please, copy the file config-example.json into config.json and fill the configuration values.');
    process.exit(-1);
}

let cards = new Array<Card>();
let deck = new Deck(cards, fisherYates);
let game = new Game(deck);

// Here goes the discord client (or any client because decoupling is magic!)
