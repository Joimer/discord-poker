import { Deck } from './deck';
import { Player } from './player';
import { GameState } from './game-state';
import { RoundState } from './round-state';

export class Game {

    deck: Deck;
    players: Array<Player> = new Array<Player>();
    gameState: GameState = GameState.NOT_READY;
    roundState: RoundState = RoundState.BLINDS;

    constructor(deck: Deck) {
        this.deck = deck;
    }

    isReady() {

    }

    join(player: Player): void {
        this.players.push(player);
    }

    joinMany(players: Array<Player>): void {
        for (const player of players) {
            this.join(player);
        }
    }

    checkState(): void {

    }

    getState(): GameState {
        return this.gameState;
    }

    start(): void {
        if (this.players.length < 2) {
            throw new Error('A game cannot begin without at least 2 players.');
        }
    }
}
