export interface variable {
  [key: string]: any;
  name: string;
  value: number;
}

export const variables: variable[] = [
  {
    name: "c1",
    value: 0
  },
  {
    name: "c2",
    value: 0
  },
  {
    name: "c3",
    value: 0
  },
  {
    name: "c4",
    value: 0
  },
  {
    name: "c5",
    value: 0
  }
];

export const variablesNames = variables.map((variable) => variable.name);
