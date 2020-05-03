import 'mocha';
import { expect } from 'chai';
import { Game } from '../src/game';
import { getPokerDeck } from '../src/deck-factory';
import { Player } from '../src/player';
import { GameState } from '../src/game-state';
import { RoundState } from '../src/round-state';
import { Card } from '../src/card';
import { CardSuit } from '../src/card-suit';

describe('getPokerDeck', () => {
    const deck = getPokerDeck();
    const player1 = new Player('Tachibana Hibiki');
    const player2 = new Player('Kohinata Miku');
    const player3 = new Player('Kazanari Tsubasa');
    const player4 = new Player('Chris-chan');
    const player5 = new Player('Akatsuki Kirika');
    const player6 = new Player('Tsukuyomi Shirabe');
    const player7 = new Player('Maria');
    const player8 = new Player('Kazanari Genjuro');

    it('should throw trying to start a game without players', () => {
        const game = new Game(deck);
        expect(() => game.start()).to.throw();
    });

    it('should be ready when 2 players have joined', () => {
        const game = new Game(deck);
        game.join(player1);
        game.join(player2);
        game.setReady();
        expect(game.getState()).to.eql(GameState.READY);
    });

    it('should start the game and set the round state to blinds', () => {
        const game = new Game(deck);
        game.joinMany([player1, player2, player3, player4, player5, player6, player7, player8]);
        game.setReady();
        game.start();
        expect(game.getRoundState()).to.eql(RoundState.BLINDS);
    });

    it('should assign the dealer, blind, and small blind', () => {
        const game = new Game(deck);
        game.joinMany([player1, player2, player3, player4, player5, player6, player7, player8]);
        game.setReady();
        game.start();
        const dealer = game.getDealer();
        const blind = game.getBlind();
        const smallBlind = game.getSmallBlind();
        expect(game.nextPlayerTo(dealer)).to.eql(smallBlind);
        expect(game.nextPlayerTo(smallBlind)).to.eql(blind);
        expect(blind.getChips()).to.eql(game.chips - game.blind);
        expect(smallBlind.getChips()).to.eql(game.chips - game.blind / 2);
    });

    it('in hole cards step every player should be dealt 2 cards', () => {
        const game = new Game(deck);
        game.joinMany([player1, player2, player3, player4, player5, player6, player7, player8]);
        game.setReady();
        game.start();
        game.deal();
        game.deal();
        expect(game.deck.count()).to.eql(34);
        expect(game.getDealer().hand.length).to.eql(2);
    });

    it('round should end if no player bets', () => {
        const game = new Game(deck);
        const players = [player1, player2, player3, player4, player5, player6, player7, player8];
        game.joinMany(players);
        game.setReady();
        game.start();
        game.deal();
        game.deal();
        for (let player of players) {
            game.fold(player);
        }
        game.finishRound();
        expect(game.round).to.eql(2);
        expect(game.roundState).to.eql(RoundState.FLOP);
    });

    it('flop', () => {

    });

    it('turn', () => {

    });

    it('river', () => {

    });

    it('winner of round', () => {

    });

    it('player without money out', () => {

    });

    it('winner of the game', () => {
        const game = new Game(deck);
        const players = [player1, player2];
        game.joinMany(players);
        game.start();
        game.deal();
        game.deal();
        const blind = game.getBlind();
        const smallBlind = game.getSmallBlind();
        game.raise(blind, 2000);
        game.raise(smallBlind, 2000);
        blind.hand = new Array<Card>();
        blind.hand.push({suit: CardSuit.CLOVER, discriminator: '2'});
        blind.hand.push({suit: CardSuit.HEART, discriminator: '3'});
        smallBlind.hand = new Array<Card>();
        smallBlind.hand.push({suit: CardSuit.DIAMOND, discriminator: '1'});
        smallBlind.hand.push({suit: CardSuit.SPADES, discriminator: '1'});
        game.tableCards = new Array<Card>();
        game.tableCards.push({suit: CardSuit.CLOVER, discriminator: '1'});
        game.tableCards.push({suit: CardSuit.HEART, discriminator: '1'});
        game.tableCards.push({suit: CardSuit.DIAMOND, discriminator: '2'});
        game.finishRound();
        game.finish();
        expect(game.winner).to.eql(smallBlind);
    });
});
