import Card from "./card";

export const enum Combination {
    ROYAL_FLUSH,
    STRAIGHT_FLUSH,
    FOUR_OF_A_KIND,
    FULL_HOUSE,
    FLUSH,
    STRAIGHT,
    THREE_OF_A_KIND,
    TWO_PAIR,
    PAIR,
    HIGH_CARD,
    NONE
};

export type CombinationCheck = (cards: Array<Card>) => boolean;

export function cardValue(card: Card, aceAsOne: boolean = false): number {
    if (card.discriminator === 'J') {
        return 11;
    }
    if (card.discriminator === 'Q') {
        return 12;
    }
    if (card.discriminator === 'K') {
        return 13;
    }
    if (card.discriminator === 'A') {
        return aceAsOne? 1 : 14;
    }
    return parseInt(card.discriminator);
}

export function orderCards(cards: Array<Card>): void {
    cards.sort((a, b) => {
        if (cardValue(a) === cardValue(b)) {
            return 0;
        }
        return cardValue(a) < cardValue(b) ? 1 : -1;
    });
}
