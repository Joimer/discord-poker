import { CommandEnvironment } from './command-environment';

export type Command = (env: CommandEnvironment, content: string | undefined) => string;
