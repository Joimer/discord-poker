import Card from '../game/card';
import { orderCards, cardValue } from '../game/combinations';
import CardSuit from '../game/card-suit';

/**
 * A straight flush is a list of cards ranked in order sharing the same suit.
 * The highest combination is checked royal flush, as it's a different combination.
 * @param cards 
 */
export default function hasStraightFlush(cards: Array<Card>): boolean {
    if (cards.length < 5) {
        return false;
    }

    // With 5 cards it's pretty easy.
    if (cards.length === 5) {
        return rankedAndSameSuit(cards);
    }

    // With 6 and 7 cards we need to get the extra ones out to check the ordering and suits.
    let suits = new Map<CardSuit, Array<Card>>();
    for (let card of cards) {
        let cardList = suits.get(card.suit);
        if (!cardList) {
            cardList = new Array<Card>();
            suits.set(card.suit, cardList);
            // Only 3 cards can be of different suit.
            if (suits.size > 3) {
                return false;
            }
        }
        cardList.push(card);
    }
    // Look, I know this isn't the most efficient way, but I'm tired of this.
    let potentialList = null;
    let hasList = false;
    for (const cardList of suits) {
        if (cardList[1].length > 4) {
            hasList = true;
            potentialList = cardList[1];
        }
    }

    if (hasList && potentialList) {
        return rankedAndSameSuit(potentialList);
    }

    return false;
}

function rankedAndSameSuit(cards: Array<Card>): boolean {
    orderCards(cards);
    let first = cards.shift();
    if (!first) {
        return false;
    }
    let suit = first.suit;
    let previousValue = cardValue(first);
    let correct = 1;
    for (let card of cards) {
        if (suit !== card.suit) {
            console.log("fuck the suit")
            return false;
        }
        let val = cardValue(card);
        if (previousValue - val > 1) {
            return false;
        }
        correct++;
        if (correct === 5) {
            return true;
        }
        previousValue = val;
    }

    return false;
}
