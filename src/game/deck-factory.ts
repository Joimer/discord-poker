import Deck from './deck';
import Card from './card';
import fisherYates from '../shuffle/fisher-yates';
import CardSuit from './card-suit';

export function getPokerDeck(): Deck {
    let suits = [CardSuit.CLOVER, CardSuit.DIAMOND, CardSuit.HEART, CardSuit.SPADES];
    let cards = new Array<Card>();
    let discriminators = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
    for (let suit of suits) {
        for (let disc of discriminators) {
            cards.push({suit: suit, discriminator: disc});
        }
    }
    
    return new Deck(cards, fisherYates);
}
