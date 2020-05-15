import Card from '../game/card';
import { orderCards, cardValue } from '../game/combinations';

/**
 * Having two different pairs of repeating numbers.
 * If the number is the same it's no longer a two pair, it's a four of a kind.
 * Check that first.
 * @param cards 
 */
export default function hasTwoPair(cards: Array<Card>): boolean {
    if (cards.length < 4) {
        return false;
    }

    orderCards(cards);

    let pairs = 0;
    let sameCount = 1;
    let previousValue = null;

    // Wow what a monstruous thing
    for (let card of cards) {
        let cardVal = cardValue(card);
        if (previousValue !== null) {
            if (cardVal === previousValue) {
                sameCount++;
                if (sameCount === 2) {
                    pairs++;
                    if (pairs === 2) {
                        return true;
                    }
                    sameCount = 0;
                }
            } else {
                sameCount = 1;
            }
        }

        previousValue = cardVal;
    }

    return false;
}
