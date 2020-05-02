import { Command } from './command';
import { Game } from '../game';
import { getPokerDeck } from '../deck-factory';
import { GuildManager } from 'discord.js';

export const commands = new Map<string, Command>();

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
    game.start();
    return '';
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
    if (game.players.length === 10) {
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
commands.set('call', (env, content): string => {
    return '';
});

// Fold (give up)
commands.set('fold', (env, content): string => {
    return '';
});

// Raise the current bet
commands.set('raise', (env, content): string => {
    return '';
});

// Force end the game
/* Implement permissions eventually
commands.set('forceend', (env, content): string => {
    return '';
});*/
