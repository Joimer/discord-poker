import Card from './card';

export default class Player {

    id: Symbol;
    name: string;
    chips: number = 0;
    hand: Array<Card>;

    constructor(name: string) {
        this.id = Symbol(name);
        this.name = name;
        this.hand = new Array<Card>();
    }

    setChips(chips: number) {
        this.chips = chips;
    }

    getChips(): number {
        return this.chips;
    }

    giveCard(card: Card) {
        this.hand.push(card);
    }

    discardHand(): void {
        this.hand = Array<Card>();
    }
}
