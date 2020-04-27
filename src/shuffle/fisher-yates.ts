import { ShuffleStrategy } from "./shuffle-strategy";
import { Card } from '../card';

export class FisherYates implements ShuffleStrategy {

    // Technically only 2^64 but good enough for a Discord poker game.
    shuffle(cards: Array<Card>): Array<Card> {
        let len: number = cards.length;
        let temp: Card;
        let i: number;

        while (len) {
            i = Math.floor(Math.random() * len--);
            temp = cards[len];
            cards[len] = cards[i];
            cards[i] = temp;
        }

        return cards;
    }
}
