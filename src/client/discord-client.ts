import { Client, Message } from 'discord.js';
import * as config from '../config.json';
import Game from '../game/game';
import Player from '../game/player';

// Player is decoupled from Discord, keep track of discord id to player which is more reliable than name.
const discordIdToPlayer = new Map<string, Player>();

// This limits the game to one game per channel per guild.
function generateGameId(message: Message): string {
    return message.guild + ':' + message.channel;
}

export const discordClient = (commands: Map<string, Function>, games: Map<string, Game>) => {
    const client = new Client();
    client.token = config.token;

    client.on("ready", () => {
        console.log('Discord client is ready.');
    });

    client.on("guildCreate", guild => {
        // This event triggers when the bot joins a guild.
        console.log(`New "noUnusedParameters": true,guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    });

    client.on("guildDelete", guild => {
        // This event triggers when the bot is removed from a guild.
        console.log(`I have been removed from: ${guild.name} (id: ${guild.id}).`);
    });

    client.on("message", async message => {

        // Ignore bots.
        if (message.author.bot) return;

        // Ignore messages without a prefix.
        if (message.content.indexOf(config.prefix) !== 0) return;

        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const gameId = generateGameId(message);
        let player = discordIdToPlayer.get(message.author.id);
        if (!player) {
            player = new Player(message.author.username);
            discordIdToPlayer.set(message.author.id, player);
        }

        if (commands.has(args[0])) {
            try {
                let command = commands.get(args[0]);
                if (!command) {
                    return;
                }
                let result = command({player: player, gameId: gameId, games: games, discordUser: message.author}, args[1]);
                if (result === "") {
                    return;
                }
                if (!result) {
                    result = "Something went wrong.";
                }
                // Empty string means the command was wrong and ignored not to spam the channel.
                if (result !== '') {
                    message.channel.send(result);
                }
            } catch (err) {
                console.log(`An error happened while handling command ${args[0]} for game ${gameId}.`);
                console.error(err);
            }
        }
    });

    client.login(config.token);
    client.user?.setActivity("All in");
};
