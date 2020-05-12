import Card from './card';

export default class Player {

    id: Symbol;
    name: string;
    // The cards in the hand of the player, that is 0 or two actually.
    hand: Array<Card>;
    // The chips the player has that are not currently not in play.
    chips: number = 0;
    // The amount of chips the player has bet.
    // These chips will go to the pot once he has folded or advances to the next round step.
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

    bet(amount: number) {
        if (amount > this.chips) {
            throw new Error("Cannot bet more chips than you have!");
        }
        this.chips -= amount;
        this.currentBet += amount;
    }
}
