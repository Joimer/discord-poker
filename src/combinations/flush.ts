import Card from '../game/card';
import CardSuit from '../game/card-suit';

export default function hasFlush(cards: Array<Card>): boolean {
    if (cards.length < 5) {
        return false;
    }

    let suits = new Map<CardSuit, number>();

    for (let card of cards) {
        suits.set(card.suit, (suits.get(card.suit) || 0) + 1);

    }
    return (suits.get(CardSuit.CLOVER) || 0) > 4
    || (suits.get(CardSuit.DIAMOND) || 0) > 4
    || (suits.get(CardSuit.HEART) || 0) > 4
    || (suits.get(CardSuit.SPADES) || 0) > 4;
}
