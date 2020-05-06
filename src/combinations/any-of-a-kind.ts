import Card from '../card';
import { orderCards } from '../combinations';

export default function hasAnyOfAKind(cards: Array<Card>, count: number): boolean {
    if (cards.length < count) {
        return false;
    }

    orderCards(cards);

    let failTolerance = cards.length - count;
    let previousCard = null;
    let fails = 0;
    let correct = 0;

    for (let card of cards) {
        if (previousCard !== null) {
            if (previousCard.discriminator !== card.discriminator) {
                fails++;
                correct = 0;
            }
            if (fails > failTolerance) {
                return false;
            }
        }

        previousCard = card;
        correct++;
        if (correct === count) {
            return true;
        }
    }
    
    return false;
}
