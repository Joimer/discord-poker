import Game from '../game/game';
import Player from '../game/player';
import { User } from 'discord.js';

type CommandEnvironment = {player: Player, gameId: string, games: Map<string, Game>, discordUser: User};

export default CommandEnvironment;
