import Card from '../card';
import { orderCards } from '../combinations';

export default function hasFullHouse(cards: Array<Card>): boolean {
    if (cards.length < 5) {
        return false;
    }

    orderCards(cards);

    let failTolerance = cards.length - 5;
    let previousCard = null;
    let fails = 0;
    // Starts at 1 because first iteration is ignored since there's no previous card to compare to.
    let sameCardCount = 1;
    let hasThree = false;
    let hasPair = false;
    let iteration = 0;

    for (let card of cards) {
        if (previousCard !== null) {
            if (previousCard.discriminator !== card.discriminator) {
                // A mismatch after a hasPair or hasThree means it could start a new repeating sequence.
                // Here the fail counter just catches early that there's no combination possible.
                if (!hasPair && !hasThree) {
                    fails++;
                    if (fails > failTolerance) {
                        return false;
                    }
                }
                sameCardCount = 1;
            } else {
                sameCardCount++;
                if (sameCardCount === 2) {
                    hasPair = true;
                }
                if (sameCardCount === 3) {
                    hasPair = false;
                    hasThree = true;
                    sameCardCount = 0;
                }
            }
        }
        
        iteration++;

        // Early return if finding three or two repeating cards is already impossible.
        if ((hasPair && !hasThree && cards.length - iteration < 2)
        || (!hasPair && hasThree && cards.length - iteration < 1)) {
            return false;
        }
        if (hasPair && hasThree) {
            return true;
        }

        previousCard = card;
    }

    return false;
}
