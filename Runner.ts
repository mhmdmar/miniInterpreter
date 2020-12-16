import { parsedCommand } from "./commands.ts";
import Logger from "./Logger.ts";

import { variables, variable } from "./variables.ts";

class Runner {
  private variables: variable[];
  constructor(variables: variable[]) {
    this.variables = variables;
  }

  runCommand(command: parsedCommand) {
    const { name, args } = command;
    switch (command.name) {
      case "add":
        this.add(command.args[0], command.args[1]);
        break;
      case "sub":
        this.sub(command.args[0], command.args[1]);
        break;
      case "mul":
        this.mul(command.args[0], command.args[1]);
        break;
      case "div":
        this.div(command.args[0], command.args[1]);
        break;
      case "clear":
        this.clear(command.args[0]);
        break;
      case "print":
        this.print(command.args[0]);
        break;
      case "printAll":
        this.printAll();
        break;
    }
  }
  getVariableByName(varName: string): variable | undefined {
    return this.variables.find((variable) => variable.name === varName);
  }
  clear(varName: string) {
    const variable = this.getVariableByName(varName);
    if (variable !== undefined) {
      variable.value = 0;
    }
  }
  printAll() {
    variables.forEach((variable) => {
      console.log(`${variable.name} = ${variable.value}`);
    });
  }
  print(varName: string) {
    console.log(this.getVariableByName(varName)?.value);
  }
  add(varName: string, value: number) {
    const variable = this.getVariableByName(varName);
    if (variable !== undefined) {
      variable.value += value;
    }
  }
  mul(varName: string, value: number) {
    const variable = this.getVariableByName(varName);
    if (variable !== undefined) {
      variable.value *= value;
    }
  }
  sub(varName: string, value: number) {
    this.add(varName, value * -1);
  }
  div(varName: string, value: number) {
    if (value === 0) {
      Logger.error("cannot divide by 0");
    } else {
      this.mul(varName, 1 / value);
    }
  }
}

const runner = new Runner(variables);
export default runner;
