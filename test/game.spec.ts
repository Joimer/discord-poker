import 'mocha';
import { expect } from 'chai';
import { Game } from '../src/game';
import { DeckFactory } from '../src/deck-factory';
import { Player } from '../src/player';
import { GameState } from '../src/game-state';
import { RoundState } from '../src/round-state';

describe('getPokerDeck', () => {
    const deck = DeckFactory.getPokerDeck();
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

    it('should assign the dealer, blind, and small blind consecutively', () => {
        const game = new Game(deck);
        game.joinMany([player1, player2, player3, player4, player5, player6, player7, player8]);
        game.setReady();
        game.start();
        let dealer = game.getDealer();
        let blind = game.getBlind();
        let smallBlind = game.getSmallBlind();
        expect(game.nextPlayerTo(dealer)).to.eql(blind);
        expect(game.nextPlayerTo(blind)).to.eql(smallBlind);
    });

    it('hole cards', () => {

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

    });
});
