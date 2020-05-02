import { Command } from './command';
import { Game } from '../game';
import { getPokerDeck } from '../deck-factory';

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

// Join an existing game
commands.set('join', (env, content): string => {
    return '';
});

// Start a game once ready
commands.set('start', (env, content): string => {
    return '';
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
commands.set('forceend', (env, content): string => {
    return '';
});
