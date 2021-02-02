import { argument, command, commands, parsedCommand } from "./commands.ts";
import { variables } from "./variables.ts";
import logger from "./Logger.ts";

class Lexer {
  private commands: command[];
  private commandList: string[];
  constructor(commands: command[]) {
    this.commands = commands;
    this.commandList = commands.map((command) => command.name);
  }
  parseText(text: string): parsedCommand | null {
    let parsedCommand = null;
    const tokens = this.makeTokens(text);
    const command = tokens[0];
    const args = [...tokens].splice(1);
    if (this.isCommandSupported(command)) {
      const parsedArgs = this.parseArgs(command, args);
      if (parsedArgs !== null) {
        parsedCommand = {
          name: command,
          args: parsedArgs.map((arg) => arg.value),
        };
      }
    } else {
      logger.error(`command is not supported`, command);
    }
    return parsedCommand;
  }
  makeTokens(text: string): string[] {
    return text
      .replace(/\s{2,}/g, " ")
      .trim()
      .split(" ");
  }
  isCommandSupported(command: string | undefined): boolean {
    return command !== undefined && this.commandList.includes(command);
  }
  parseArgs(command: string, args: string[]): argument[] | null {
    const commandObj = this.commands.find(
      (curCommand) => curCommand.name === command,
    );
    let parsedArgs: argument[] | null = null;
    const len = args.length;
    if (len !== commandObj?.args) {
      logger.error(`command '${command}' does not support '${len}' arguments`);
    } else {
      parsedArgs = this.parseArguments(args);
      for (let i = 0; i < len; i++) {
        const curArg = parsedArgs[i].type;
        const argKey = "arg" + (i + 1);
        const curArgType = commandObj[argKey];
        if (curArgType !== parsedArgs[i].type) {
          logger.error(
            `command ${command} doesn't support type '${curArg}' as argument number ${i +
              1}`,
          );
          parsedArgs = null;
          break;
        }
      }
    }
    return parsedArgs;
  }

  parseArguments(args: string[]): argument[] {
    const parsedArgs: argument[] = [];
    for (let i = 0, len = args.length; i < len; i++) {
      const curArg = args[i];
      let type;
      let value: any = curArg;
      if (!isNaN(Number(curArg))) {
        type = "number";
        value = Number(curArg);
      } else if (curArg === "true" || curArg === "false") {
        type = "boolean";
        value = curArg === "true";
      } else if (variables.getNames().includes(curArg)) {
        type = "var";
      } else {
        type = "unknown";
      }
      parsedArgs.push({
        value,
        type,
      });
    }
    return parsedArgs;
  }
}

const lexer = new Lexer(commands);
lexer.parseText("add c1 20");
export default new Lexer(commands);
