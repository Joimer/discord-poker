import { Game } from '../game';
import { Player } from '../player';

export type CommandEnvironment = {player: Player, gameId: string, games: Map<string, Game>};
