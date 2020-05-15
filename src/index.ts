import fs from 'fs';
import { discordClient } from './client/discord-client';
import Game from './game/game';
import path from 'path';
import commands from './commands/command-list';

if (!fs.existsSync(path.join(__dirname, 'config.json'))) {
    console.error('Please, copy the file config-example.json into config.json and fill the configuration values.');
    process.exit(-1);
}

const games = new Map<string, Game>();

discordClient(commands, games);
