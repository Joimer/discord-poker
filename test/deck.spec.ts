import 'mocha';
import { Deck } from '../src/deck';
import { expect } from 'chai';
import { Card } from '../src/card';
import { FisherYates } from '../src/shuffle/fisher-yates';
import { CardSuit } from '../src/card-suit';
import { DeckFactory } from '../src/deck-factory';

describe('hasCards', () => {

    it('a new empty deck should have no cards', () => {
        const cards = new Array<Card>();
        const deck = new Deck(cards, new FisherYates());

        expect(deck.hasCards()).to.equal(false);
    });

    it('a deck with two cards should count 2', () => {
        const cards = new Array<Card>();
        cards.push(new Card(CardSuit.CLOVER, '1'));
        cards.push(new Card(CardSuit.CLOVER, '2'));
        const deck = new Deck(cards, new FisherYates());

        expect(deck.hasCards()).to.equal(true);
        expect(deck.count()).to.equal(2);
    });
});

describe('shuffle', () => {
    it('two equal decks shuffled should begin with a different card', () => {
        const deck = DeckFactory.getPokerDeck();
        const deck2 = DeckFactory.getPokerDeck();
        deck2.shuffle();

        expect(deck.draw(1) === deck2.draw(1)).to.equal(false);
    });
});
