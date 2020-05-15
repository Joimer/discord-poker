import { orderCards } from '../game/combinations';
import Card from '../game/card';

export default function getHighCard(cards: Array<Card>): Card|undefined {
    orderCards(cards);
    return cards.shift();
}
