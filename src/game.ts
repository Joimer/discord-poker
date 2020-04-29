import { Deck } from './deck';
import { Player } from './player';
import { GameState } from './game-state';
import { RoundState } from './round-state';

export class Game {

    deck: Deck;
    players: Array<Player> = new Array<Player>();
    gameState: GameState = GameState.NOT_READY;
    roundState: RoundState = RoundState.NOT_READY;

    constructor(deck: Deck) {
        this.deck = deck;
    }

    isReady(): boolean {
        return this.gameState === GameState.READY;
    }

    join(player: Player): void {
        this.players.push(player);
    }

    joinMany(players: Array<Player>): void {
        for (const player of players) {
            this.join(player);
        }
    }

    setReady(): void {
        if (this.gameState !== GameState.NOT_READY) {
            throw new Error("This game was already set ready!");
        }
        if (this.players.length < 2) {
            throw new Error("Not enough players.");
        }
        this.gameState = GameState.READY;
    }

    getState(): GameState {
        return this.gameState;
    }

    getRoundState(): RoundState {
        return this.roundState;
    }

    start(): void {
        if (this.players.length < 2) {
            throw new Error('A game cannot begin without at least 2 players.');
        }
        this.roundState = RoundState.BLINDS;
        this.gameState = GameState.READY;
    }
}
