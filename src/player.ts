import Card from './card';

export default class Player {

    id: Symbol;
    name: string;
    chips: number = 0;
    hand: Array<Card>;
    currentBet: number = 0;

    constructor(name: string) {
        this.id = Symbol(name);
        this.name = name;
        this.hand = new Array<Card>();
    }

    giveCard(card: Card) {
        this.hand.push(card);
    }

    discardHand(): void {
        this.hand = Array<Card>();
    }
}
