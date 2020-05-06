import { orderCards, cardValue } from '../combinations';
import Card from '../card';
import CardSuit from '../card-suit';

/**
 * A royal flush is the card sequence A, K, Q, J, 10 all with the same suit.
 * @param cards 
 */
export default function hasRoyalFlush(cards: Array<Card>): boolean {
    if (cards.length < 5) {
        return false;
    }

    orderCards(cards);

    let firstCard = cards.shift();
    // TS yells at me this can be undefined even though it is impossible.
    if (!firstCard) {
        return false;
    }
    
    // If first one ordered isn't the Ace, this cannot be a Royal Flush.
    if (cardValue(firstCard) < 14) {
        return false;
    }

    // Times a card can be ignored to count for the combination.
    // -3 because we retrieved the first card already.
    let maxDupes = cards.length - 3;
    let dupeCount = 0;
    let previousSuit = firstCard.suit;
    let possibleSuits: Array<CardSuit> = [previousSuit];
    let kingSuits = new Array<CardSuit>();
    let previousValue = 14;
    let correct = 1;

    for (let card of cards) {
        let cardVal = cardValue(card);

        // It's possible to have some repeats if we are checking against 6 or 7 cards.
        if (cardVal === previousValue) {
            dupeCount++;
            // This will immediately break if we have 5 cards.
            if (dupeCount > maxDupes) {
                return false;
            }

            // The Ace can have different suits that can follow.
            // The most extreme case is 3 different aces and then the subsequent 4 cards of the same suit.
            if (cardVal === 14) {
                possibleSuits.push(card.suit);
            }
            continue;
        }

        // By Queen, the only possible suit is one that is present in both Ace and King
        if (cardVal === 12) {
            possibleSuits = possibleSuits.filter(suit => kingSuits.indexOf(suit) !== -1);
        }

        // Suit can change given there are 6 or 7 cards to check.
        if (previousSuit !== card.suit) {
            // If we have 5 to check, it's impossible to have a royal flush with a change of suit.
            if (cards.length === 5) {
                return false;
            }

            // The king after the ace can be a different suit from the previous ace if we have 2 or 3 aces.
            // A lower card (k, q, j, 10) can also be duped and therefor a different suit and should be ignored.
            // Here we have two options.
            // If a card doesn't share a suit with any present ace and king, the royal flush is impossible.
            // If it's shared and there's only one repeat so far, there can be down the road another repeat with 7 cards.
            if (!possibleSuits.includes(card.suit) && cardVal < 13) {
                continue;
            }
        }

        // Store the king suits to intersect ace, king suits (if both are dupe) with the rest.
        if (cardVal === 13) {
            kingSuits.push(card.suit);
        }

        // If the next card is lower than 1 point difference, there's no straight.
        if (previousValue - cardVal > 1) {
            return false;
        }
        previousValue = cardVal;
        correct++;
        if (correct === 5) {
            return true;
        }
    }

    return false;
}
