import Game from '../game';
import Player from '../player';

type CommandEnvironment = {player: Player, gameId: string, games: Map<string, Game>};

export default CommandEnvironment;
