import Card from "./card";
import Deck from './deck';
import PlayerTable from './player-table';
import Player from './player';
import RoundState from './round-state';
import TurnState from './turn-state';
import { getHighestCombination } from './combinations';

export default class Round {

    deck: Deck;
    players: PlayerTable;
    table = new Array<Card>();
    pot: number = 0;
    state: RoundState = RoundState.NOT_READY;
    winner: Player|null = null;
    currentPlay: Player|null = null;
    blind: number = 0;
    currentHighestBet: number = 0;
    allinQuantity: number = 0;

    constructor(players: PlayerTable, deck: Deck, blind: number) {
        this.players = players;
        this.deck = deck;
        this.blind = blind;
    }

    start(): void {
        this.players.prepareTable();
        this.state = RoundState.BLINDS;
        this.blinds();
    }

    deal(): void {
        for (let player of this.players.getAll()) {
            let cards = this.deck.draw();
            if (cards.length > 0) {
                player.giveCard(cards[0]);
            }
        }
    }

    tableDeal(num: number = 1): void {
        let cards = this.deck.draw(num);
        this.table = this.table.concat(cards);
    }

    isTheirTurn(player: Player): boolean {
        return this.currentPlay === player;
    }

    next(): void {
        this.playerTable.nextTurn();
        this.turn = this.playerTable.getCurrentPlayer();
    }

    /**
     * Dealer, blind, and small blind are decided and set.
     */
    blinds(): void {
        if (this.state !== RoundState.BLINDS) {
            throw new Error("State mismatch: Cannot `hole`.");
        }
        this.currentPlay = this.players.getCurrentPlayer();
        const blind = this.players.getBlind();
        blind.currentBet = this.blind;
        blind.chips -= this.blind;
        this.currentHighestBet = this.blind;
        const smallBlind = this.players.getSmallBlind();
        smallBlind.currentBet = Math.ceil(this.blind / 2);
        smallBlind.chips -= Math.ceil(this.blind / 2);
        this.state = RoundState.HOLE_CARDS;
    }

    /**
     * First two cards dealt to the players.
     */
    hole() {
        if (this.state !== RoundState.HOLE_CARDS) {
            throw new Error("State mismatch: Cannot `hole`.");
        }
        this.deal();
        this.deal();
        this.state = RoundState.BETTING;
    }

    /**
     * Three cards are dealt to the table.
     */
    flop() {
        if (this.state !== RoundState.FLOP) {
            throw new Error("State mismatch: Cannot `flop`.");
        }
        this.deck.burn();
        this.tableDeal(3);
        this.state = RoundState.BETTING;
    }

    /**
     * Fourth car dealt to the table.
     */
    turn() {
        if (this.state !== RoundState.TURN) {
            throw new Error("State mismatch: Cannot `turn`.");
        }
        this.deck.burn();
        this.tableDeal();
        this.state = RoundState.BETTING;
    }

    /**
     * Fifth and final card deal to the table.
     */
    river() {
        if (this.state !== RoundState.RIVER) {
            throw new Error("State mismatch: Cannot `river`.");
        }
        this.deck.burn();
        this.tableDeal();
        this.state = RoundState.BEST_HAND;
    }

    /**
     * Raises the current bet.
     * @param player 
     * @param quantity 
     */
    raise(player: Player, quantity: number): void {
        if (quantity > player.chips) {
            throw new Error("Player doesn't have enough chips to bet this amount!");
        }
        player.currentBet += quantity;
        player.chips -= quantity;
        this.players.state.set(player, TurnState.BET);
    }

    /**
     * Accept the current bet.
     * @param player
     */
    check(player: Player): void {
        let quantity = this.currentHighestBet - player.currentBet;
        this.raise(player, quantity);
    }

    /**
     * Does not continue in the current turn.
     * @param player 
     */
    fold(player: Player): void {
        this.pot += player.currentBet;
        player.currentBet = 0;
        this.players.state.set(player, TurnState.FOLDED);
    }

    /**
     * Player bets the remainder of their coins.
     * @param player 
     */
    allin(player: Player): void {
        player.currentBet += player.chips;
        this.allinQuantity = player.currentBet;
        player.chips = 0;
    }

    checkBets(): void {

    }

    /**
     * Number of active players in the round.
     */
    playersInGame(): number {
        let psin = 0;
        for (let player of this.players.getAll()) {
            // Folded means he gave up on the round, out means the player has no chips to play with and is out of the game.
            if (this.players.state.get(player) !== TurnState.OUT
            && this.players.state.get(player) !== TurnState.FOLDED) {
                psin++;
            }
        }

        return psin;
    }

    /**
     * Gets the winner of the current hands.
     */
    calculateWinner(): Player|undefined {
        let competing = new Array<Player>();
        for (let [player, state] of this.players.state) {
            if (state === TurnState.BET) {
                competing.push(player);
            }
        }
        if (competing.length !== 1) {
            competing.sort((a, b) => {
                const valA = getHighestCombination(a.hand, this.table);
                const valB = getHighestCombination(b.hand, this.table);
                if (valA === valB) return 0;
                return (valA > valB) ? 1 : -1;
            });
        }
        
        return competing.shift();
    }
}