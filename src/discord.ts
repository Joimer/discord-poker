import { Client } from 'discord.js';
import * as config from './config.json';

const client = new Client();

try {
    client.token = config.token;
} catch (err) {
    console.error("Please, copy config-example.json into config.json and fill the information.");
    process.exit(-1);
}


