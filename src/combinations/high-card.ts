import { orderCards } from '../combinations';
import Card from '../card';

export default function getHighCard(cards: Array<Card>): Card|undefined {
    orderCards(cards);
    return cards.shift();
}
