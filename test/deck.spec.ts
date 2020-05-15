import 'mocha';
import Deck from '../src/game/deck';
import { expect } from 'chai';
import Card from '../src/game/card';
import fisherYates from '../src/shuffle/fisher-yates';
import CardSuit from '../src/game/card-suit';

describe('hasCards', () => {

    it('a new empty deck should have no cards', () => {
        const cards = new Array<Card>();
        const deck = new Deck(cards, fisherYates);

        expect(deck.hasCards()).to.equal(false);
    });

    it('a deck with two cards should count 2', () => {
        const cards = new Array<Card>();
        cards.push({suit: CardSuit.CLOVER, discriminator: 'A'});
        cards.push({suit: CardSuit.CLOVER, discriminator: '2'});
        const deck = new Deck(cards, fisherYates);

        expect(deck.hasCards()).to.equal(true);
        expect(deck.count()).to.equal(2);
    });
});
