import { CardSuit } from './card-suit';

export class Card {

    suit: CardSuit;
    number: number;

    constructor(suit: CardSuit, number: number) {
        this.suit = suit;
        this.number = number;
    }
}
