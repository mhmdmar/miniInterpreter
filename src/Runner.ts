import { parsedCommand } from "./commands.ts";

import { Variables, variables } from "./variables.ts";

class Runner {
  private variables: Variables;
  constructor(variables: Variables) {
    this.variables = variables;
  }

  runCommand(command: parsedCommand) {
    const { name, args } = command;
    /* @ts-ignore */
    this.variables[name]?.(...args);
  }
}

const runner = new Runner(variables);
export default runner;
