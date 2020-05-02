import { Deck } from './deck';
import { Card } from './card';
import { FisherYates } from '../src/shuffle/fisher-yates';
import { CardSuit } from './card-suit';

export function getPokerDeck(): Deck {
    let suits = [CardSuit.CLOVER, CardSuit.DIAMOND, CardSuit.HEART, CardSuit.SPADES];
    let cards = new Array<Card>();
    let discriminators = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
    for (let suit of suits) {
        for (let disc of discriminators) {
            cards.push(new Card(suit, disc));
        }
    }
    
    return new Deck(cards, new FisherYates());
}
