
export type ConverterType = 'rocks' | 'sellables';

export interface LogEntry {
  id: string;
  type: ConverterType;
  input: number;
  inputLabel: string;
  ratio: number;
  tro: number;
  direction: 'forward' | 'reverse';
  time: string;
}

export interface ItemRatio {
  name: string;
  ratio: number;
  icon: string;
}
