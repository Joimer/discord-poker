import { Player } from './player';
import { fisherYates } from './shuffle/fisher-yates';

export class PlayerTable {

    turn: number = 0;
    players: Array<Player>;

    constructor(players: Array<Player>) {
        this.players = fisherYates(players);
    }

    getPlayer(turn: number): Player {
        return this.players[turn];
    }

    getDealer(): Player {
        return this.getPlayer(this.turn);
    }

    getSmallBlind(): Player {
        let nextTurn = this.turn + 1;
        if (nextTurn === this.players.length) {
            nextTurn = 0;
        }
        return this.getPlayer(nextTurn);
    }

    getBlind(): Player {
        let nextTurn = this.turn + 2;
        if (nextTurn >= this.players.length) {
            nextTurn -= this.players.length;
        }
        return this.getPlayer(nextTurn);
    }

    nextTurn(): void {
        this.turn++;
        if (this.turn === this.players.length) {
            this.turn = 0;
        }
    }

    nextPlayerTo(player: Player): Player {
        let initialPlayer = -1;
        for (let i = 0; i < this.players.length; i++) {
            let possiblePlayer = this.players[i];
            if (player.id === possiblePlayer.id) {
                initialPlayer = i;
                break;
            }
        }
        if (initialPlayer === -1) {
            throw new Error('Player not found, state missmatch.');
        }
        initialPlayer++;
        if (initialPlayer === this.players.length) {
            initialPlayer = 0;
        }

        return this.getPlayer(initialPlayer);
    }
}
