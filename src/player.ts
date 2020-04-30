import { Card } from './card';

export class Player {

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

    getHandCards(): Array<Card> {
        return this.hand;
    }
}
