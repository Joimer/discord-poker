import 'mocha';
import { expect } from 'chai';
import { hasStraight, hasAnyOfAKind, hasFullHouse, hasFlush, hasRoyalFlush } from '../src/combinations';
import Card from '../src/card';
import CardSuit from '../src/card-suit';

describe('card combinations', () => {
    it('should return royal flush being there and not', () => {
        let cards: Array<Card> = [
            {suit: CardSuit.CLOVER, discriminator: 'A'},
            {suit: CardSuit.CLOVER, discriminator: '10'},
            {suit: CardSuit.CLOVER, discriminator: 'Q'},
            {suit: CardSuit.CLOVER, discriminator: 'K'},
            {suit: CardSuit.CLOVER, discriminator: 'J'}
        ];
        expect(hasRoyalFlush(cards)).to.equal(true);
        cards = [
            {suit: CardSuit.CLOVER, discriminator: '3'},
            {suit: CardSuit.CLOVER, discriminator: 'A'},
            {suit: CardSuit.CLOVER, discriminator: '10'},
            {suit: CardSuit.CLOVER, discriminator: '5'},
            {suit: CardSuit.CLOVER, discriminator: 'Q'},
            {suit: CardSuit.CLOVER, discriminator: 'K'},
            {suit: CardSuit.CLOVER, discriminator: 'J'}
        ];
        expect(hasRoyalFlush(cards)).to.equal(true);
        cards = [
            {suit: CardSuit.CLOVER, discriminator: '1'},
            {suit: CardSuit.CLOVER, discriminator: 'A'},
            {suit: CardSuit.CLOVER, discriminator: '3'},
            {suit: CardSuit.CLOVER, discriminator: '5'},
            {suit: CardSuit.CLOVER, discriminator: '4'},
            {suit: CardSuit.CLOVER, discriminator: '2'},
            {suit: CardSuit.CLOVER, discriminator: '8'}
        ];
        expect(hasRoyalFlush(cards)).to.equal(true);
        cards = [
            {suit: CardSuit.CLOVER, discriminator: '3'},
            {suit: CardSuit.CLOVER, discriminator: 'A'},
            {suit: CardSuit.CLOVER, discriminator: '10'},
            {suit: CardSuit.CLOVER, discriminator: '5'},
            {suit: CardSuit.CLOVER, discriminator: '7'},
            {suit: CardSuit.CLOVER, discriminator: 'K'},
            {suit: CardSuit.CLOVER, discriminator: 'J'}
        ];
        expect(hasRoyalFlush(cards)).to.equal(false);
        cards = [
            {suit: CardSuit.CLOVER, discriminator: '3'},
            {suit: CardSuit.HEART, discriminator: 'A'},
            {suit: CardSuit.CLOVER, discriminator: '10'},
            {suit: CardSuit.HEART, discriminator: '5'},
            {suit: CardSuit.CLOVER, discriminator: '7'},
            {suit: CardSuit.DIAMOND, discriminator: 'K'},
            {suit: CardSuit.CLOVER, discriminator: 'J'}
        ];
        expect(hasRoyalFlush(cards)).to.equal(false);
    });

    it('should return straight flush being there and not', () => {
        let cards: Array<Card> = [
            {suit: CardSuit.CLOVER, discriminator: 'A'},
            {suit: CardSuit.HEART, discriminator: '10'},
            {suit: CardSuit.CLOVER, discriminator: 'Q'},
            {suit: CardSuit.CLOVER, discriminator: 'K'},
            {suit: CardSuit.SPADES, discriminator: 'J'}
        ];
        expect(hasStraight(cards, true)).to.equal(true);
        cards = [
            {suit: CardSuit.CLOVER, discriminator: '3'},
            {suit: CardSuit.HEART, discriminator: 'A'},
            {suit: CardSuit.CLOVER, discriminator: '10'},
            {suit: CardSuit.DIAMOND, discriminator: '5'},
            {suit: CardSuit.CLOVER, discriminator: 'Q'},
            {suit: CardSuit.SPADES, discriminator: 'K'},
            {suit: CardSuit.CLOVER, discriminator: 'J'}
        ];
        expect(hasStraight(cards, true)).to.equal(true);
        cards = [
            {suit: CardSuit.CLOVER, discriminator: '3'},
            {suit: CardSuit.CLOVER, discriminator: '4'},
            {suit: CardSuit.CLOVER, discriminator: '5'},
            {suit: CardSuit.CLOVER, discriminator: '6'},
            {suit: CardSuit.CLOVER, discriminator: '7'},
            {suit: CardSuit.CLOVER, discriminator: '2'},
            {suit: CardSuit.CLOVER, discriminator: '8'}
        ];
        expect(hasStraight(cards, true)).to.equal(true);
        cards = [
            {suit: CardSuit.CLOVER, discriminator: '3'},
            {suit: CardSuit.CLOVER, discriminator: 'A'},
            {suit: CardSuit.CLOVER, discriminator: '10'},
            {suit: CardSuit.CLOVER, discriminator: '5'},
            {suit: CardSuit.CLOVER, discriminator: '7'},
            {suit: CardSuit.CLOVER, discriminator: 'K'},
            {suit: CardSuit.CLOVER, discriminator: 'J'}
        ];
        expect(hasStraight(cards, true)).to.equal(false);
    });

    it('should return four of a kind being there and not', () => {
        let cards: Array<Card> = [
            {suit: CardSuit.HEART, discriminator: '2'},
            {suit: CardSuit.CLOVER, discriminator: 'A'},
            {suit: CardSuit.HEART, discriminator: 'A'},
            {suit: CardSuit.CLOVER, discriminator: 'A'},
            {suit: CardSuit.SPADES, discriminator: 'A'},
        ];
        expect(hasAnyOfAKind(cards, 4)).to.equal(true);
        cards = [
            {suit: CardSuit.CLOVER, discriminator: 'A'},
            {suit: CardSuit.HEART, discriminator: '2'},
            {suit: CardSuit.CLOVER, discriminator: 'A'},
            {suit: CardSuit.SPADES, discriminator: 'A'},
        ];
        expect(hasAnyOfAKind(cards, 4)).to.equal(false);
    });

    it('should return three of a kind being there and not', () => {
        let cards: Array<Card> = [
            {suit: CardSuit.HEART, discriminator: '2'},
            {suit: CardSuit.CLOVER, discriminator: 'A'},
            {suit: CardSuit.HEART, discriminator: 'A'},
            {suit: CardSuit.SPADES, discriminator: 'A'},
        ];
        expect(hasAnyOfAKind(cards, 3)).to.equal(true);
        cards = [
            {suit: CardSuit.CLOVER, discriminator: 'A'},
            {suit: CardSuit.HEART, discriminator: '2'},
            {suit: CardSuit.SPADES, discriminator: 'A'},
        ];
        expect(hasAnyOfAKind(cards, 3)).to.equal(false);
    });

    it('should return pair being there and not', () => {
        let cards: Array<Card> = [
            {suit: CardSuit.HEART, discriminator: '2'},
            {suit: CardSuit.CLOVER, discriminator: 'A'},
            {suit: CardSuit.HEART, discriminator: 'A'},
            {suit: CardSuit.CLOVER, discriminator: '3'},
            {suit: CardSuit.SPADES, discriminator: '4'},
        ];
        expect(hasAnyOfAKind(cards, 2)).to.equal(true);
        cards = [
            {suit: CardSuit.CLOVER, discriminator: 'A'},
            {suit: CardSuit.HEART, discriminator: '2'},
            {suit: CardSuit.CLOVER, discriminator: '3'},
            {suit: CardSuit.SPADES, discriminator: '4'},
        ];
        expect(hasAnyOfAKind(cards, 2)).to.equal(false);
    });

    it('full house', () => {
        let cards: Array<Card> = [
            {suit: CardSuit.HEART, discriminator: 'A'},
            {suit: CardSuit.CLOVER, discriminator: 'A'},
            {suit: CardSuit.HEART, discriminator: 'A'},
            {suit: CardSuit.CLOVER, discriminator: '3'},
            {suit: CardSuit.SPADES, discriminator: '4'},
            {suit: CardSuit.SPADES, discriminator: '4'},
            {suit: CardSuit.SPADES, discriminator: '4'},
        ];
        expect(hasFullHouse(cards)).to.equal(true);
        cards = [
            {suit: CardSuit.CLOVER, discriminator: 'A'},
            {suit: CardSuit.HEART, discriminator: '2'},
            {suit: CardSuit.CLOVER, discriminator: '3'},
            {suit: CardSuit.SPADES, discriminator: '4'},
            {suit: CardSuit.SPADES, discriminator: '5'},
            {suit: CardSuit.SPADES, discriminator: 'Q'},
        ];
        expect(hasFullHouse(cards)).to.equal(false);
    });

    it('flush', () => {
        let cards: Array<Card> = [
            {suit: CardSuit.SPADES, discriminator: 'A'},
            {suit: CardSuit.SPADES, discriminator: 'A'},
            {suit: CardSuit.HEART, discriminator: 'A'},
            {suit: CardSuit.SPADES, discriminator: '3'},
            {suit: CardSuit.SPADES, discriminator: '4'},
            {suit: CardSuit.SPADES, discriminator: '4'},
            {suit: CardSuit.HEART, discriminator: '4'},
        ];
        expect(hasFlush(cards)).to.equal(true);
        cards = [
            {suit: CardSuit.CLOVER, discriminator: 'A'},
            {suit: CardSuit.HEART, discriminator: '2'},
            {suit: CardSuit.CLOVER, discriminator: '3'},
            {suit: CardSuit.SPADES, discriminator: '4'},
            {suit: CardSuit.DIAMOND, discriminator: '5'},
            {suit: CardSuit.SPADES, discriminator: 'Q'},
        ];
        expect(hasFlush(cards)).to.equal(false);
    });

    it('straight', () => {
        let cards: Array<Card> = [
            {suit: CardSuit.CLOVER, discriminator: 'A'},
            {suit: CardSuit.HEART, discriminator: '10'},
            {suit: CardSuit.CLOVER, discriminator: 'Q'},
            {suit: CardSuit.CLOVER, discriminator: 'K'},
            {suit: CardSuit.SPADES, discriminator: 'J'}
        ];
        expect(hasStraight(cards, false)).to.equal(true);
        cards = [
            {suit: CardSuit.CLOVER, discriminator: '3'},
            {suit: CardSuit.HEART, discriminator: 'A'},
            {suit: CardSuit.CLOVER, discriminator: '10'},
            {suit: CardSuit.DIAMOND, discriminator: '5'},
            {suit: CardSuit.CLOVER, discriminator: 'Q'},
            {suit: CardSuit.SPADES, discriminator: 'K'},
            {suit: CardSuit.CLOVER, discriminator: 'J'}
        ];
        expect(hasStraight(cards, false)).to.equal(true);
        cards = [
            {suit: CardSuit.CLOVER, discriminator: '3'},
            {suit: CardSuit.CLOVER, discriminator: '4'},
            {suit: CardSuit.CLOVER, discriminator: '5'},
            {suit: CardSuit.CLOVER, discriminator: '6'},
            {suit: CardSuit.CLOVER, discriminator: '7'},
            {suit: CardSuit.CLOVER, discriminator: '2'},
            {suit: CardSuit.CLOVER, discriminator: '8'}
        ];
        expect(hasStraight(cards, false)).to.equal(true);
        cards = [
            {suit: CardSuit.CLOVER, discriminator: '3'},
            {suit: CardSuit.CLOVER, discriminator: 'A'},
            {suit: CardSuit.CLOVER, discriminator: '10'},
            {suit: CardSuit.CLOVER, discriminator: '5'},
            {suit: CardSuit.CLOVER, discriminator: '7'},
            {suit: CardSuit.CLOVER, discriminator: 'K'},
            {suit: CardSuit.CLOVER, discriminator: 'J'}
        ];
        expect(hasStraight(cards, false)).to.equal(false);
    });

    it('two pair', () => {
        let cards: Array<Card> = [
            {suit: CardSuit.SPADES, discriminator: 'A'},
            {suit: CardSuit.SPADES, discriminator: 'A'},
            {suit: CardSuit.SPADES, discriminator: '3'},
            {suit: CardSuit.SPADES, discriminator: '4'},
            {suit: CardSuit.SPADES, discriminator: '4'},
            {suit: CardSuit.HEART, discriminator: '5'},
        ];
        expect(hasTwoPair(cards)).to.equal(true);
        cards = [
            {suit: CardSuit.CLOVER, discriminator: 'A'},
            {suit: CardSuit.HEART, discriminator: '2'},
            {suit: CardSuit.CLOVER, discriminator: '3'},
            {suit: CardSuit.SPADES, discriminator: '4'},
            {suit: CardSuit.DIAMOND, discriminator: '5'},
            {suit: CardSuit.SPADES, discriminator: 'Q'},
        ];
        expect(hasTwoPair(cards)).to.equal(false);
    });

    it('get high card', () => {
        let cards: Array<Card> = [
            {suit: CardSuit.SPADES, discriminator: 'A'},
            {suit: CardSuit.SPADES, discriminator: '3'},
            {suit: CardSuit.SPADES, discriminator: '4'},
            {suit: CardSuit.SPADES, discriminator: '4'},
            {suit: CardSuit.HEART, discriminator: '4'},
        ];
        expect(getHighCard(cards)).to.equal({suit: CardSuit.SPADES, discriminator 'A'});
    });
});
