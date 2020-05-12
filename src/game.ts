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
        return this.currentRound.isTheirTurn(player);
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
        this.currentRound.allin(player);
    }

    checkForWinner(): void {
        let withChips = 0;
        let possibleWinner = null;
        for (let player of this.playerTable.getAll()) {
            if (player.chips > 0) {
                withChips++;
                possibleWinner = player;
            }
            if (withChips > 1) {
                break;
            }
        }
        if (withChips === 1) {
            this.winner = possibleWinner;
            this.gameState = GameState.FINISHED;
        }
    }

    finish(): void {
        // TODO or to delete idk yet
    }
}
