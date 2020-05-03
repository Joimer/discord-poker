import Deck from './deck';
import Player from './player';
import GameState from './game-state';
import RoundState from './round-state';
import PlayerTable from './player-table';
import Card from './card';
import TurnState from './turn-state';

export default class Game {

    deck: Deck;
    players: Array<Player> = new Array<Player>();
    gameState: GameState = GameState.NOT_READY;
    roundState: RoundState = RoundState.NOT_READY;
    turn: Player | null = null;
    playerLimit: number;
    round: number;
    blind: number;
    chips: number;
    blindIncreaseTurns: number;
    playerTable: PlayerTable;
    tableCards: Array<Card> = new Array<Card>();
    winner: Player | null = null;
    pot: number = 0;
    currentTurnStatus: Map<Player, TurnState> = new Map<Player, TurnState>();

    constructor(deck: Deck) {
        this.deck = deck;
        this.playerLimit = 10;
        this.round = 0;
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
        for (let player of this.players) {
            this.currentTurnStatus.set(player, TurnState.WAITING);
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
        this.round = 1;
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
        for (let player of this.players) {
            let cards = this.deck.draw();
            if (cards.length > 0) {
                player.giveCard(cards[0]);
            }
        }
    }

    isTheirTurn(player: Player): boolean {
        return this.turn === player;
    }

    call(player: Player): void {

    }

    check(player: Player): void {

    }

    raise(player: Player, quantity: number): void {
        
    }

    fold(player: Player): void {
        
    }

    finishRound(): void {
        this.round++;
    }

    finish(): void {

    }

    currentBet(player: Player): number {
        // For testing and so on, TODO
        return this.blind;
    }
}
