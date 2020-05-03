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
    currentTurnStatus: Map<Player, TurnState> = new Map<Player, TurnState>();
    playerLimit: number;
    round: number;
    blind: number;
    chips: number;
    blindIncreaseTurns: number;
    playerTable: PlayerTable;
    tableCards: Array<Card> = new Array<Card>();
    winner: Player | null = null;
    pot: number = 0;
    currentHighestBet: number = 0;
    allinQuantity: number = 0;

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
        this.gameState = GameState.STARTED;
        this.turn = this.playerTable.getCurrentPlayer();
        this.playerTable.getBlind().currentBet = this.blind;
        this.currentHighestBet = this.blind;
        this.playerTable.getSmallBlind().currentBet = Math.ceil(this.blind / 2);
        this.round = 1;
    }

    nextRound(): void {
        this.roundState = RoundState.BLINDS;
        this.round++;
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
        let increase = this.currentHighestBet - player.currentBet;
        if (increase > player.chips) {
            return this.allin(player);
        }
        player.currentBet = this.currentHighestBet;
        player.chips -= increase;
        this.currentTurnStatus.set(player, TurnState.BET);
    }

    allin(player: Player): void {
        this.allinQuantity = player.chips;
        player.currentBet = player.chips;
        player.chips = 0;
    }

    next(): void {
        this.playerTable.nextTurn();
        this.turn = this.playerTable.getCurrentPlayer();
    }

    check(player: Player): void {
        this.currentTurnStatus.set(player, TurnState.BET);
        this.next();
    }

    raise(player: Player, quantity: number): void {
        if (quantity > player.chips) {
            throw new Error("Player doesn't have enough chips to bet this amount!");
        }
        player.currentBet = quantity;
        player.chips -= quantity;
    }

    fold(player: Player): void {
        this.currentTurnStatus.set(player, TurnState.FOLDED);
        player.currentBet = 0;
    }

    finishRound(): void {
        this.round++;
        this.allinQuantity = 0;
        this.currentHighestBet = 0;
    }

    finish(): void {

    }
}
