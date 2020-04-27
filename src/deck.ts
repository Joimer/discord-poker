import { Card } from './card';
import { ShuffleStrategy } from './shuffle/shuffle-strategy';

export class Deck {
    cards: Array<Card>;
    pulled: Array<Card>;
    shuffleStrategy: ShuffleStrategy;

    constructor(cards: Array<Card>, shuffleStrategy: ShuffleStrategy) {
        this.cards = cards;
        this.pulled = new Array<Card>();
        this.shuffleStrategy = shuffleStrategy;
    }

    shuffle(): void {
        this.cards = this.shuffleStrategy.shuffle(this.cards);
    }

    hasCards(): boolean {
        return this.count() > 0;
    }

    count(): number {
        return this.cards.length;
    }

    /**
     * Returns the required number of cards, if any.
     */
    draw(number: number = 1): Array<Card> {
        let drawn = new Array<Card>();
        for (let i = 0; i < Math.min(number, this.cards.length); i++) {
            drawn.push(this.cards[i]);
        }

        return drawn;
    }
}
