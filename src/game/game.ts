import Deck from './deck';
import Player from './player';
import GameState from './game-state';
import RoundState from './round-state';
import PlayerTable from './player-table';
import Card from './card';
import Round from './round';

export default class Game {

    deck: Deck;
    gameState: GameState = GameState.NOT_READY;
    turn: Player | null = null;
    playerLimit: number;
    round: number;
    blind: number;
    chips: number;
    blindIncreaseRounds: number;
    playerTable: PlayerTable;
    tableCards: Array<Card> = new Array<Card>();
    winner: Player | null = null;
    pot: number = 0;
    currentHighestBet: number = 0;
    currentRound: Round;

    constructor(deck: Deck) {
        this.deck = deck;
        this.playerLimit = 10;
        this.round = 0;
        this.blind = 20;
        this.chips = 2000;
        this.blindIncreaseRounds = 5;
        this.playerTable = new PlayerTable(new Array<Player>());
        this.currentRound = new Round(this.playerTable, this.deck, this.blind);
    }

    isReady(): boolean {
        return this.gameState === GameState.READY;
    }

    join(player: Player): void {
        if (this.playerTable.count() === this.playerLimit) {
            // The max is 10 usually, the recommended is 6 to 8, even if it can be played from 2 upwards.
            throw new Error(`The maximum number of players is ${this.playerLimit}.`);
        }
        player.chips = this.chips;
        this.playerTable.add(player);
    }

    joinMany(players: Array<Player>): void {
        for (const player of players) {
            this.join(player);
        }
    }

    shufflePlayers(): void {
        if (this.gameState === GameState.STARTED) {
            throw new Error("Cannot shuffle players when the game has already started.");
        }
        this.playerTable.shufflePlayers();
    }

    setReady(): void {
        if (this.gameState !== GameState.NOT_READY) {
            throw new Error("This game was already set ready!");
        }
        if (this.playerTable.count() < 2) {
            throw new Error("Not enough players.");
        }
        this.gameState = GameState.READY;
        this.currentRound.start();
    }

    getRoundState(): RoundState {
        return this.currentRound.state;
    }

    isTheirTurn(player: Player): boolean {
        // for debug
        player = this.currentRound.currentPlay? this.currentRound.currentPlay : player;
        return true;
        //return this.currentRound.isTheirTurn(player);
    }

    start(): void {
        if (this.gameState !== GameState.READY) {
            throw new Error('Game is not ready to be started.');
        }
        if (this.playerTable.count() < 2) {
            throw new Error('A game cannot begin without at least 2 players.');
        }
        this.gameState = GameState.STARTED;
        this.currentRound.start();
        this.round = 1;
    }

    next(): void {
        this.currentRound.next();
    }

    nextRound(): void {
        this.currentRound = new Round(this.playerTable, this.deck, this.blind);
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

    call(player: Player): void {
        this.currentRound.check(player);
    }

    allin(player: Player): void {
        this.currentRound.allin(player);
    }

    raise(player: Player, quantity: number): void {
        this.currentRound.raise(player, quantity);
    }

    fold(player: Player): void {
        this.currentRound.fold(player);
    }

    checkForWinner(): void {
        let withChips = 0;
        let possibleWinner = null;
        for (let player of this.playerTable.getAll()) {
            if (player.chips > 0) {
                withChips++;
                possibleWinner = player;
            }
        }
        // TODO: Actually implement this.
        if (withChips === 1) {
            this.winner = possibleWinner;
            this.gameState = GameState.FINISHED;
        }
    }

    startNewRound() {
        this.currentRound.start();
    }

    calculateRoundWinner() {
        this.currentRound.calculateWinner();
    }

    finish(): void {
        // TODO or to delete idk yet
    }
}
