import 'mocha';
import { expect } from 'chai';
import Round from '../src/game/round';
import { getPokerDeck } from '../src/game/deck-factory';
import PlayerTable from '../src/game/player-table';
import Player from '../src/game/player';
import RoundState from '../src/game/round-state';
import TurnState from '../src/game/turn-state';

describe('round', () => {
    const player1 = new Player('Hakurei Reimu');
    const player2 = new Player('Kirisame Marisa');
    const player3 = new Player('Cirno');
    const player4 = new Player('Hong Meiling');
    const player5 = new Player('Izayoi Sakuya');
    const player6 = new Player('Patchouli Knowledge');
    const player7 = new Player('Remilia Scarlet');
    const player8 = new Player('Flandre Scarlet');
    const allPlayers = [player1, player2, player3, player4, player5, player6, player7, player8];
    for (let player of allPlayers) {
        player.chips = 2000;
    }
    const deck = getPokerDeck();

    it('should set a new round to Not Ready state', () => {
        const round = new Round(new PlayerTable(allPlayers), deck, 20);
        expect(round.state).to.eql(RoundState.NOT_READY);
    });

    it("should throw if a player has not done any action and the round tries to advance", () => {
        const round = new Round(new PlayerTable(allPlayers), deck, 20);
        round.start();
        round.blinds();
        round.check(player1);
        round.check(player2);
        round.check(player3);
        round.check(player4);
        round.check(player5);
        round.check(player6);
        round.check(player7);
        expect(() => round.checkBets()).to.throw();
    });

    it('should continue the betting after a round if there is an ongoing raise', () => {
        const round = new Round(new PlayerTable(allPlayers), deck, 20);
        round.start();
        round.blinds();
        expect(round.state).to.eql(RoundState.HOLE_CARDS);
        round.hole();
        expect(round.state).to.eql(RoundState.BETTING);
        round.check(player1);
        round.check(player2);
        round.check(player3);
        round.check(player4);
        round.check(player5);
        round.check(player6);
        round.check(player7);
        round.raise(player8, 500);
        // Here the current bet is risen to 500 from the default blind of 20.
        // The round shouldn't advance state, but continue on betting on the hole cards.
        expect(round.players.state.get(player8)).to.eql(TurnState.BET_RAISE);
        round.checkBets();
        expect(round.state).to.eql(RoundState.BETTING);
    });

    it('should play a full round', () => {
        const round = new Round(new PlayerTable(allPlayers), deck, 20);
        round.start();
        round.blinds();
        round.hole();
        round.check(player1);
        round.check(player2);
        round.check(player3);
        round.check(player4);
        round.check(player5);
        round.check(player6);
        round.check(player7);
        round.check(player8);
        round.checkBets();
        round.fold(player1);
        round.fold(player2);
        round.fold(player3);
        round.fold(player4);
        round.check(player5);
        round.check(player6);
        round.check(player7);
        round.check(player8);
        round.checkBets();
        expect(round.playersInGame()).to.eql(4);
        expect(round.state).to.eql(RoundState.FLOP);
        round.flop();
        expect(round.state).to.eql(RoundState.FLOP_BETTING);
        round.fold(player5);
        round.check(player6);
        round.check(player7);
        round.check(player8);
        round.checkBets();
        expect(round.state).to.eql(RoundState.TURN);
        round.turn();
        expect(round.state).to.eql(RoundState.TURN_BETTING);
        round.check(player6);
        round.check(player7);
        round.check(player8);
        round.checkBets();
        expect(round.state).to.eql(RoundState.RIVER);
        round.river();
        expect(round.state).to.eql(RoundState.RIVER_BETTING);
        round.check(player6);
        round.check(player7);
        round.check(player8);
        round.checkBets();
        expect(round.state).to.eql(RoundState.BEST_HAND);
        round.calculateWinner();
        expect(round.state).to.eql(RoundState.FINISHED);
    });
});
