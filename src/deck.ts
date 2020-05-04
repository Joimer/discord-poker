import Card from './card';
import ShuffleStrategy from './shuffle/shuffle-strategy';

export default class Deck {
    cards: Array<Card>;
    pulled: Array<Card>;
    shuffleStrategy: ShuffleStrategy<Card>;

    constructor(cards: Array<Card>, shuffleStrategy: ShuffleStrategy<Card>) {
        this.cards = cards;
        this.pulled = new Array<Card>();
        this.shuffleStrategy = shuffleStrategy;
    }

    shuffle(): void {
        this.cards = this.shuffleStrategy(this.cards);
    }

    hasCards(): boolean {
        return this.count() > 0;
    }

    count(): number {
        return this.cards.length;
    }

    total(): number {
        return this.cards.length + this.pulled.length;
    }

    /**
     * Returns the required number of cards, if any.
     */
    draw(number: number = 1): Array<Card> {
        let drawn = new Array<Card>();
        for (let i = 0; i < Math.min(number, this.cards.length); i++) {
            let card = this.cards.shift();
            if (card) {
                drawn.push(this.cards[i]);
                this.pulled.push(card);
            }
        }

        return drawn;
    }

    burn(): void {
        let card = this.cards.shift();
        if (card) {
            this.pulled.push(card);
        }
    }
}
