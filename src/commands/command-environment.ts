import Game from '../game/game';
import Player from '../game/player';

type CommandEnvironment = {player: Player, gameId: string, games: Map<string, Game>};

export default CommandEnvironment;
