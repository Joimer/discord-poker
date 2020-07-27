import Command from './command';
import Game from '../game/game';
import { getPokerDeck } from '../game/deck-factory';
import CardSuit from '../game/card-suit';
import TurnState from '../game/turn-state';
import CommandEnvironment from './command-environment';

const commands = new Map<string, Command>();

// Create a new game
commands.set('create', (env): string => {
    if (env.games.get(env.gameId)) {
        return "There's already a game on this channel.";
    }
    try {
        let game = new Game(getPokerDeck());
        env.games.set(env.gameId, game);
        return "Game created! Press p!join to join the game (2-10 players).";
    } catch (e) {
        return e.message;
    }
});

function startGame(game: Game): string {
    game.shufflePlayers();
    game.setReady();
    game.start();
    let res = "The game has started!"
    + "\nPlay with the commands `check` (accept a bet), `call` (raise your bet to current bet),"
    + " `raise [amount]` (raise bet to specified amount), `fold` (leave bet)."
    + "\nThe starting positions are: **"
    + game.getDealer().name + "** (dealer), **"
    + game.getSmallBlind().name + "** (small blind of "
    + Math.ceil(game.blind / 2) + "), **"
    + game.getBlind().name + "** (blind of " + game.blind + ")";
    const allPlayers = game.playerTable.getAll();
    if (allPlayers.length > 2) {
        res += ", **";
        let players = [];
        for (let player of allPlayers.slice(2)) {
            players.push(player.name);
        }
        res += players.join('**, **') + "**";
    }
    res += ".\n" + reportGameState(game);

    return res;
}

function reportGameState(game: Game): string {
    let state = 'Round: ' + game.round + "\n"; 
    state += 'Table: ';
    let cards = [];
    for (let card of game.currentRound.table) {
        cards.push(`[${card.discriminator}` + suitToString(card.suit) + ']');
    }
    state += cards.join('') + "\n";
    let players = [];
    for (let [player, status] of game.currentRound.players.state) {
        let p = `[${player.name}] Chips: ${player.chips}`;
        p += ' State: ' + turnStateToString(status);
        if (status !== TurnState.OUT) {
            p += ` Bet: ${player.currentBet}`;
        }
        players.push(p);
    }
    state += players.join(', ');

    return state;
}

// Eeeeeeh
function suitToString(suit: CardSuit): string {
    switch (suit) {
        case CardSuit.CLOVER:
            return ":four_leaf_clover:";
        case CardSuit.DIAMOND:
            return ":diamonds:";
        case CardSuit.HEART:
            return ":heart:";
        case CardSuit.SPADES:
            return ":spades:";
    }
}

function turnStateToString(turnState: TurnState) {
    switch (turnState) {
        case TurnState.BET:
            return "Betting";
        case TurnState.BET_LOWER:
            return "Betting (below)";
        case TurnState.FOLDED:
            return "Folded";
        case TurnState.OUT:
            return "Out of the game";
        case TurnState.WAITING:
            return "Waiting turn";
    }
}

// Join an existing game
commands.set('join', (env): string => {
    let game = env.games.get(env.gameId);
    if (!game) {
        return "There's no game going on in this channel.";
    }
    game.join(env.player);
    let res = `${env.player.name} has joined the game.`;
    // Magic number, config?
    if (game.playerTable.count() === 10) {
        res += "\n" + startGame(game);
    }
    return res;
});

// Start a game once ready
commands.set('start', (env): string => {
    let game = env.games.get(env.gameId);
    if (!game) {
        return "There's no game going on in this channel.";
    }

    return startGame(game);
});

// Call the bet
commands.set('call', (env): string => {
    let game = env.games.get(env.gameId);
    if (!game) {
        return "There's no game going on in this channel.";
    }
    if (!game.isTheirTurn(env.player)) {
        console.log("not " + env.player.name + "'s turn")
        return "";
    }
    try {
        game.call(env.player);
        game.next();
        return env.player.name + " called the bet.\n" + reportGameState(game);
    } catch (err) {
        return err.message;
    }
});

// Check (accept the current bet)
commands.set('check', (env): string => {
    let game = env.games.get(env.gameId);
    if (!game) {
        return "There's no game going on in this channel.";
    }
    if (!game.isTheirTurn(env.player)) {
        return "";
    }
    try {
        game.currentRound.check(env.player);
        game.next();
        return env.player.name + " checks.\n" + reportGameState(game);
    } catch (err) {
        return err.message;
    }
});

// Fold (give up)
commands.set('fold', (env): string => {
    let game = env.games.get(env.gameId);
    if (!game) {
        return "There's no game going on in this channel.";
    }
    if (!game.isTheirTurn(env.player)) {
        return "";
    }
    try {
        game.fold(env.player);
        game.next();
        return env.player.name + " folds.\n" + reportGameState(game);
    } catch (err) {
        return err.message;
    }
});

// Raise the current bet
commands.set('raise', (env, content): string => {
    let game = env.games.get(env.gameId);
    if (!game) {
        return "There's no game going on in this channel.";
    }
    if (!game.isTheirTurn(env.player)) {
        return "";
    }
    let amount = parseInt('' + content);
    if (isNaN(amount) || amount <= 0) {
        return "Invalid amount to bet. You need to bet an integer number that is at least twice the blind.";
    }
    let increment = amount - env.player.currentBet;
    if (increment < game.blind) {
        return "The increment is not big enough! You need to bet an integer number that is at least twice the blind.";
    }
    try {
        game.raise(env.player, amount);
        game.next();
        return env.player.name + ` raised to ${amount}.` + "\n" + reportGameState(game);
    } catch (err) {
        return err.message;
    }
});

// Ask for your current hand
commands.set('hand', (env: CommandEnvironment): string => {
    let game = env.games.get(env.gameId);
    if (!game) {
        return "There's no game going on in this channel.";
    }

    // Send private message
    env.discordUser.send("");

    return "";
});

// Force end the game
/* Implement permissions eventually
commands.set('forceend', (env, content): string => {
    return '';
});*/

export default commands;
