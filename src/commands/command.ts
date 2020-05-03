import CommandEnvironment from './command-environment';

type Command = (env: CommandEnvironment, content: string | undefined) => string;

export default Command;
