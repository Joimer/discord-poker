import { Deck } from './deck';
import { Card } from './card';
import { FisherYates } from '../src/shuffle/fisher-yates';
import { CardSuit } from './card-suit';

export class DeckFactory {
    static getPokerDeck(): Deck {
        let suits = new Array<CardSuit>();
        suits.push(CardSuit.CLOVER);
        suits.push(CardSuit.DIAMOND);
        suits.push(CardSuit.HEART);
        suits.push(CardSuit.SPADES);
        let cards = new Array<Card>();
        let discriminators = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
        for (let suit of suits) {
            for (let i = 0; i < 13; i++) {
                let disc = discriminators[i];
                cards.push(new Card(suit, disc));
            }
        }
        
        return new Deck(cards, new FisherYates());
    }
}
