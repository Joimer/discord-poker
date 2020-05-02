import { Command } from './command';

export const commands = new Map<string, Command>();

// Create a new game
commands.set('create', (env, content): string => {
    return '';
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
