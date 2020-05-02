import { Deck } from './deck';
import { Player } from './player';
import { GameState } from './game-state';
import { RoundState } from './round-state';
import { PlayerTable } from './player-table';
import { Card } from './card';

export class Game {

    deck: Deck;
    players: Array<Player> = new Array<Player>();
    gameState: GameState = GameState.NOT_READY;
    roundState: RoundState = RoundState.NOT_READY;
    playerLimit: number;
    turn: number;
    blind: number;
    chips: number;
    blindIncreaseTurns: number;
    playerTable: PlayerTable;
    tableCards: Array<Card> = new Array<Card>();
    winner: Player | null = null;

    constructor(deck: Deck) {
        this.deck = deck;
        this.playerLimit = 10;
        this.turn = 0;
        this.blind = 20;
        this.chips = 2000;
        this.blindIncreaseTurns = 5;
        this.playerTable = new PlayerTable(this.players);
    }

    isReady(): boolean {
        return this.gameState === GameState.READY;
    }

    join(player: Player): void {
        if (this.players.length === this.playerLimit) {
            // The max is 10 usually, the recommended is 6 to 8, even if it can be played from 2 upwards.
            throw new Error(`The maximum number of players is ${this.playerLimit}.`);
        }
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
        this.turn = 1;
    }

    getDealer(): Player {
        return this.playerTable.getDealer();
    }

    getBlind(): Player {
        return this.playerTable.getBlind();
    }

    getSmallBlind(): Player {
        return this.playerTable.getSmallBlind();
    }

    nextPlayerTo(player: Player) : Player {
        return this.playerTable.nextPlayerTo(player);
    }

    burn(): void {
        this.deck.burn();
    }

    // Deals one card from the deck to each player.
    deal(): void {

    }

    check(player: Player): void {

    }

    raise(player: Player, quantity: number): void {
        
    }

    fold(player: Player): void {
        
    }

    finishRound(): void {
        this.turn++;
    }

    finish(): void {

    }
}
