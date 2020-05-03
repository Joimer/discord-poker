import fs from 'fs';
import { discordClient } from './discord-client';
import Game from './game';
import Command from './commands/command';

if (!fs.existsSync('./config.json')) {
    console.error('Please, copy the file config-example.json into config.json and fill the configuration values.');
    process.exit(-1);
}

const games = new Map<string, Game>();
const commands = new Map<string, Command>();

discordClient(commands, games);
