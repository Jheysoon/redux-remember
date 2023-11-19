export type SerializeFunction = (data: any, key: string) => any;
export type UnserializeFunction = (data: any, key: string) => any;

export type Driver = {
  getItem: (key: string) => any;
  setItem: (key: string, value: any) => any;
};

export type Options = {
  prefix: string,
  serialize: SerializeFunction,
  unserialize: UnserializeFunction,
  persistThrottle: number,
  persistDebounce?: number,
  persistWholeStore: boolean,
  initActionType?: string
};

export type ExtendedOptions = Options & {
  driver: Driver
};
