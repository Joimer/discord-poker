import Card from '../card';
import { orderCards, cardValue } from '../combinations';

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
            // Check first that the suit is proper.
            // Then check values, Ace being checked after the first means it's being played as a 1.
            if (previousCard.discriminator === 'A') {
                cards.push(previousCard);
                aceAsOne = true;
            }
            if (previousCard.suit !== card.suit || cardValue(previousCard) - cardValue(card, aceAsOne) > 1) {
                fails++;
                correct = 0;
            }
            if (fails > failTolerance) {
                return false;
            }
        } else {
            // First card, check special case for ace (can be first in AKQJ10 or last in 5432A)
            if (card.discriminator === 'A') {
                cards.push(card);
                aceAsOne = true;
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
