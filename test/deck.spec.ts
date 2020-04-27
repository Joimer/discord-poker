import { Deck } from '../src/deck';
import { expect } from 'chai';
import 'mocha';
import { Card } from '../src/card';
import { FisherYates } from '../build/shuffle/fisher-yates';

describe('hasCards function', () => {

    it('should return false', () => {
        const cards = Array<Card>();
        const deck = new Deck(cards, new FisherYates());

        expect(deck.hasCards()).to.equal(false);
    });
});
