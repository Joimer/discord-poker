import { Card } from '../card';

export interface ShuffleStrategy {
    shuffle(cards: Array<Card>): Array<Card>;
}
