import { Game } from "./game";
import { Deck } from './deck';
import { FisherYates } from './shuffle/fisher-yates';
import { Card } from './card';

let cards = new Array<Card>();
let deck = new Deck(cards, new FisherYates());
let game = new Game(deck);
// Here goes the discord client (or any client because decoupling is magic!)
