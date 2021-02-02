import lexer from "./Lexer.ts";
import runner from "./Runner.ts";
import Logger from "./Logger.ts";
function trimmedIput(input: string | null): string {
  if (input === null) {
    input = "";
  }
  return input.trim();
}
function runLine(line: string): void {
  const parsedCommand = lexer.parseText(line);
  if (parsedCommand !== null) {
    runner.runCommand(parsedCommand);
  }
}
function runUserInputLoop() {
  while (true) {
    const input = trimmedIput(prompt("command - "));
    switch (input) {
      case null:
      case "":
        Logger.log("skipping empty line...");
        break;
      case "exit":
        Deno.exit();
        break;
      default:
        runLine(input);
        break;
    }
  }
}
async function main() {
  const inputFile = Deno.args[0];
  const outputFile = Deno.args[1];
  const argsLen = Deno.args.length;
  if (argsLen === 0) {
    runUserInputLoop();
  } else if (argsLen === 1) {
    const text = await Deno.readTextFile(inputFile);
    text.split("\n").forEach((line) => {
      runLine(line);
    });
  } else if (argsLen === 2) {
    const text = await Deno.readTextFile(inputFile);
    const printedLines: string[] = [];
    const _log = console.log;
    console.log = function (...arg: any) {
      printedLines.push(...arg);
    };
    text.split("\n").forEach((line) => {
      runLine(line);
    });
    console.log = _log;
    await Deno.writeTextFile(outputFile, printedLines.join("\n"));
  }
}

export default main;
