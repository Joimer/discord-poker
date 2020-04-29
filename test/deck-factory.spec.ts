import 'mocha';
import { expect } from 'chai';
import { DeckFactory } from '../src/deck-factory';

describe('getPokerDeck', () => {
    it('the poker deck getter should return the 52 cards', () => {
        const deck = DeckFactory.getPokerDeck();
        expect(deck.hasCards()).to.equal(true);
        expect(deck.count()).to.equal(52);
    });
});
