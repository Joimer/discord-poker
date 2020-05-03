import Player from './player';
import fisherYates from './shuffle/fisher-yates';

export default class PlayerTable {

    private players: Array<Player>;
    // Turn is the player that has to pick an action.
    // Starts at 3 on a new game (0 dealer, 1 small blind, 2 big blind)
    dealer: number = 0;
    smallBlind: number = 1;
    blind: number = 2;
    turn: number = 3;

    constructor(players: Array<Player>) {
        this.players = fisherYates(players);
    }

    private getPlayer(turn: number): Player {
        return this.players[turn];
    }

    getCurrentPlayer(): Player {
        return this.getPlayer(this.turn);
    }

    getDealer(): Player {
        return this.getPlayer(this.dealer);
    }

    getSmallBlind(): Player {
        return this.getPlayer(this.smallBlind);
    }

    getBlind(): Player {
        return this.getPlayer(this.blind);
    }

    nextTurn(): void {
        this.dealer = this.increaseTurn(this.dealer);
        this.smallBlind = this.increaseTurn(this.smallBlind);
        this.blind = this.increaseTurn(this.blind);
        this.turn = this.increaseTurn(this.turn);
    }

    private increaseTurn(turn: number): number {
        turn++;
        if (turn === this.players.length) {
            turn = 0;
        }
        return turn;
    }
}
