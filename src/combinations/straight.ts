import Card from '../card';
import { orderCards, cardValue } from '../combinations';

/**
 * Straight is a five combination of cards ranked in order where the ace can be either 1 or 14.
 * Suit is irrelevant here.
 * @param cards 
 */
export default function hasStraight(cards: Array<Card>): boolean {
    if (cards.length < 5) {
        return false;
    }

    orderCards(cards);

    let failTolerance = cards.length - 5;
    let previousCard = null;
    let fails = 0;
    let aceAsOne = false;
    let correct = 0;

    for (let card of cards) {
        if (previousCard !== null) {
            // Then check values, Ace being checked after the first means it can be played as a 1.
            if (previousCard.discriminator === 'A') {
                cards.push(previousCard);
                aceAsOne = true;
            }
            if (cardValue(previousCard) - cardValue(card, aceAsOne) > 1) {
                fails++;
                if (fails > failTolerance) {
                    return false;
                }
                continue;
            }
        }

        previousCard = card;
        correct++;
        if (correct === 5) {
            return true;
        }
    }
    
    return false;
}
