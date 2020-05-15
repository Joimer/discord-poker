import 'mocha';
import { expect } from 'chai';
import Game from '../src/game/game';
import { getPokerDeck } from '../src/game/deck-factory';
import Player from '../src/game/player';
import GameState from '../src/game/game-state';
import RoundState from '../src/game/round-state';
import CardSuit from '../src/game/card-suit';

describe('game class', () => {
    const deck = getPokerDeck();
    const player1 = new Player('Tachibana Hibiki');
    const player2 = new Player('Kohinata Miku');
    const player3 = new Player('Kazanari Tsubasa');
    const player4 = new Player('Chris-chan');
    const player5 = new Player('Akatsuki Kirika');
    const player6 = new Player('Tsukuyomi Shirabe');
    const player7 = new Player('Maria');
    const player8 = new Player('Kazanari Genjuro');
    const allPlayers = [player1, player2, player3, player4, player5, player6, player7, player8];

    it('should throw trying to start a game without players', () => {
        const game = new Game(deck);
        expect(() => game.start()).to.throw();
    });

    it('should be ready when 2 players have joined', () => {
        const game = new Game(deck);
        game.join(player1);
        game.join(player2);
        game.setReady();
        expect(game.gameState).to.eql(GameState.READY);
    });

    it('should start the game and set the round state to blinds', () => {
        const game = new Game(deck);
        game.joinMany(allPlayers);
        game.setReady();
        game.start();
        expect(game.getRoundState()).to.eql(RoundState.BLINDS);
    });

    it('should assign the dealer, blind, and small blind', () => {
        const game = new Game(deck);
        game.joinMany(allPlayers);
        game.setReady();
        game.start();
        game.currentRound.blinds();
        const blind = game.getBlind();
        const smallBlind = game.getSmallBlind();
        expect(blind.chips).to.eql(game.chips - game.blind);
        expect(smallBlind.chips).to.eql(game.chips - game.blind / 2);
    });

    it('in hole cards step every player should be dealt 2 cards', () => {
        const game = new Game(deck);
        game.joinMany(allPlayers);
        game.setReady();
        game.start();
        game.currentRound.blinds();
        game.currentRound.hole();
        expect(game.deck.count()).to.eql(game.deck.total() - allPlayers.length * 2);
        expect(game.getDealer().hand.length).to.eql(2);
    });

    it('round should end if no player bets', () => {
        const game = new Game(deck);
        game.joinMany(allPlayers);
        game.setReady();
        game.start();
        let b = game.getBlind();
        game.currentRound.blinds();
        game.currentRound.hole();
        expect(game.round).to.eql(1);
        for (let player of allPlayers) {
            if (player !== b) {
                game.fold(player);
            }
        }
        game.currentRound.calculateWinner();
        expect(game.currentRound.winner).to.eql(b);
        game.nextRound();
        expect(game.round).to.eql(2);
        expect(game.getRoundState()).to.eql(RoundState.NOT_READY);
        game.currentRound.start();
        expect(game.getRoundState()).to.eql(RoundState.BLINDS);
    });

    it('player without money out', () => {
        const game = new Game(deck);
        game.joinMany(allPlayers);
        game.setReady();
        game.start();
        let b = game.getBlind();
        game.currentRound.blinds();
        game.currentRound.hole();
        for (let player of allPlayers) {
            if (player !== b) {
                // Technically impossible, but the game and round state do not check deck sanity.
                player.hand = [{suit: CardSuit.HEART, discriminator: 'A'}, {suit: CardSuit.DIAMOND, discriminator: 'A'}];
                game.call(player);
            }
        }
        game.allin(b);
        b.hand = [{suit: CardSuit.CLOVER, discriminator: '2'}, {suit: CardSuit.SPADES, discriminator: '4'}];
        game.currentRound.calculateWinner();
        game.nextRound();
        game.currentRound.start();
        expect(game.currentRound.playersInGame()).to.eql(7);
    });

    /* TODO:
    it('winner of the game', () => {
        const game = new Game(deck);
        const players = [player1, player2];
        game.joinMany(players);
        game.setReady();
        console.log();
        game.start();
        game.deal();
        game.deal();
        const blind = game.getBlind();
        const smallBlind = game.getSmallBlind();
        game.raise(blind, 2000 - game.blind);
        game.raise(smallBlind, 2000 - Math.ceil(game.blind / 2));
        blind.hand = new Array<Card>();
        blind.hand.push({suit: CardSuit.CLOVER, discriminator: '2'});
        blind.hand.push({suit: CardSuit.HEART, discriminator: '3'});
        smallBlind.hand = new Array<Card>();
        smallBlind.hand.push({suit: CardSuit.DIAMOND, discriminator: 'A'});
        smallBlind.hand.push({suit: CardSuit.SPADES, discriminator: 'A'});
        game.tableCards = new Array<Card>();
        game.tableCards.push({suit: CardSuit.CLOVER, discriminator: 'A'});
        game.tableCards.push({suit: CardSuit.HEART, discriminator: 'A'});
        game.tableCards.push({suit: CardSuit.DIAMOND, discriminator: '2'});
        game.nextRound();
        game.checkForWinner();
        game.finish();
        expect(game.winner).to.eql(smallBlind);
    });*/
});
