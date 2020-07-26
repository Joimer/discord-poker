import Player from './player';
import fisherYates from '../shuffle/fisher-yates';
import TurnState from './turn-state';

export default class PlayerTable {

    private players: Array<Player>;
    // Turn is the player that has to pick an action.
    turn: number = 3;
    dealer: number = 0;
    smallBlind: number = 1;
    blind: number = 2;
    state = new Map<Player, TurnState>();

    constructor(players: Array<Player>) {
        this.players = players;
        for (let player of this.players) {
            this.state.set(player, TurnState.WAITING);
        }
    }

    private getPlayer(turn: number): Player {
        return this.players[turn];
    }

    shufflePlayers(): void {
        this.players = fisherYates(this.players);
    }

    count(): number {
        return this.players.length;
    }
    
    add(player: Player): void {
        this.players.push(player);
    }
    
    getAll() {
        return this.players;
    }

    // Once all players have joined the table, time to give out the roles.
    prepareTable(): void {
        if (this.players.length < 2) {
            throw new Error('Not enough players to prepare a table!');
        }

        // If there are 2 players only, the dealer is the blind too.
        // Also the game is started by smallBlind.
        if (this.players.length === 2) {
            this.blind = 0;
            this.turn = 1;
        }

        // With 3 players, the dealer starts. 
        if (this.players.length === 3) {
            this.turn = 0;
        }
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

    isLastPlayer(): boolean {
        return this.turn === this.players.length;
    }

    private increaseTurn(turn: number): number {
        turn++;
        if (turn === this.players.length) {
            turn = 0;
        }
        return turn;
    }
}
