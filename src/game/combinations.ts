import Card from "./card";
import hasRoyalFlush from '../combinations/royal-flush';
import hasStraightFlush from '../combinations/straight-flush';
import hasAnyOfAKind from '../combinations/any-of-a-kind';
import hasFullHouse from '../combinations/full-house';
import hasFlush from '../combinations/flush';
import hasStraight from '../combinations/straight';
import hasTwoPair from '../combinations/two-pair';

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

// TODO: Turn type and overall value to compare similar hands (straight flush vs straight flush and so on)
// This requires to change the combination matchers so high card can be played as well.
// I kind of wasted time but not since this was fun to make and made me advance to the next step ever so slowly.
export function getHighestCombination(hand: Array<Card>, table: Array<Card>): Combination {
    let mix = hand.concat(table);
    if (hasRoyalFlush(mix)) {
        return Combination.ROYAL_FLUSH;
    }
    if (hasStraightFlush(mix)) {
        return Combination.STRAIGHT_FLUSH;
    }
    if (hasAnyOfAKind(mix, 4)) {
        return Combination.FOUR_OF_A_KIND;
    }
    if (hasFullHouse(mix)) {
        return Combination.FULL_HOUSE;
    }
    if (hasFlush(mix)){
        return Combination.FLUSH;
    }
    if (hasStraight(mix)) {
        return Combination.STRAIGHT;
    }
    if (hasAnyOfAKind(mix, 3)) {
        return Combination.THREE_OF_A_KIND;
    }
    if (hasTwoPair(mix)) {
        return Combination.TWO_PAIR;
    }
    if (hasAnyOfAKind(mix, 2)) {
        return Combination.PAIR;
    }

    return Combination.HIGH_CARD;
}
