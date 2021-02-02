export const commands: command[] = [
  {
    name: "add",
    args: 2,
    arg1: "var",
    arg2: "number",
  },
  {
    name: "sub",
    args: 2,
    arg1: "var",
    arg2: "number",
  },
  {
    name: "mul",
    args: 2,
    arg1: "var",
    arg2: "number",
  },
  {
    name: "div",
    args: 2,
    arg1: "var",
    arg2: "number",
  },
  {
    name: "reset",
    args: 1,
    arg1: "var",
  },
  {
    name: "print",
    args: 1,
    arg1: "var",
  },
  {
    name: "printAll",
    args: 0,
  },
];

export interface command {
  [key: string]: any;
  name: string;
  args: number;
  arg1?: any;
  arg2?: any;
}

export interface argument {
  value: string;
  type: any;
}

export interface parsedCommand {
  [key: string]: any;
  name: string;
  args: any[];
}
