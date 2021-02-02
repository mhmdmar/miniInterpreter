import Logger from "./Logger.ts";

class Variable {
  public name: string;
  public value: number;

  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}

type variableCallback = (variable: Variable) => void;
type variableCallbackError = (varName: string) => void;

class Variables {
  private variables: Variable[];

  constructor(size: number) {
    this.variables = [];
    this.createVariables(size);
  }

  createVariables(size: number) {
    for (let i = 1; i <= size; i++) {
      this.variables.push(new Variable(`c${i}`, 0));
    }
  }

  getNames() {
    return this.variables.map((variable) => variable.name);
  }

  getByName(varName: string) {
    return this.variables.find((variable) => variable.name === varName);
  }

  _variableCallback(
    varName: string,
    cbExists: variableCallback,
    cbMissing?: variableCallbackError,
  ) {
    const variable = this.getByName(varName);
    if (variable) {
      cbExists(variable);
    } else {
      cbMissing?.(varName);
    }
  }

  clear(varName: string) {
    this._variableCallback(varName, (variable: Variable) => {
      variable.value = 0;
    });
  }
  printAll() {
    this.variables.forEach((variable) => {
      Logger.log(`${variable.name} = ${variable.value}`);
    });
  }
  print(varName: string) {
    this._variableCallback(varName, (variable: Variable) => {
      Logger.log(variable.value);
    }, (name: string) => {
      Logger.error(name, "doesn't exist");
    });
  }
  add(varName: string, value: number) {
    this._variableCallback(varName, (variable: Variable) => {
      variable.value += value;
    });
  }
  mul(varName: string, value: number) {
    this._variableCallback(varName, (variable: Variable) => {
      variable.value *= value;
    });
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

const variables = new Variables(5);
export { Variables, variables };
