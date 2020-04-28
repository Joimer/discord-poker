import { CardSuit } from './card-suit';

export class Card {

    constructor(private readonly suit: CardSuit, private readonly discriminator: string) {}
}
