import { Deck } from '../src/deck';
import { expect } from 'chai';
import 'mocha';
import { Card } from '../src/card';
import { FisherYates } from '../build/shuffle/fisher-yates';
import { CardSuit } from '../build/card-suit';

describe('hasCards function', () => {

    it('should return false', () => {
        const cards = Array<Card>();
        const deck = new Deck(cards, new FisherYates());

        expect(deck.hasCards()).to.equal(false);
    });

    it('should return 2', () => {
        const cards = Array<Card>();
        cards.push(new Card(CardSuit.CLOVER, 1));
        cards.push(new Card(CardSuit.CLOVER, 2));
        const deck = new Deck(cards, new FisherYates());

        expect(deck.hasCards()).to.equal(true);
        expect(deck.count()).to.equal(2);
    });
});
