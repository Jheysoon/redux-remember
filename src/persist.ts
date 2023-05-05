import isDeepEqual from './is-deep-equal';
import { ExtendedOptions } from './types';

type SaveAllOptions = Pick<
  ExtendedOptions,
  'prefix' | 'driver' | 'serialize'
>;

export const saveAll = async (
  state: any,
  oldState: any,
  { prefix, driver, serialize }: SaveAllOptions
) => {
  if (!isDeepEqual(state, oldState)) {
    return driver.setItem(
      `${prefix}rootState`,
      serialize(state, 'rootState')
    );
  }
};

export const saveAllKeyed = (
  state: any,
  oldState: any,
  { prefix, driver, serialize }: SaveAllOptions
) => Promise.all(
  Object.keys(state).map((key) => {
    if (isDeepEqual(state[key], oldState[key])) {
      return Promise.resolve();
    }

    return driver.setItem(
      `${prefix}${key}`,
      serialize(state[key], key)
    );
  })
);

export const persist = async (
  state = {},
  oldState = {},
  {
    prefix,
    driver,
    persistWholeStore,
    serialize
  }: Pick<
    ExtendedOptions,
    'prefix' | 'driver' | 'persistWholeStore' | 'serialize'
  >
) => {
  try {
    const save = persistWholeStore
      ? saveAll
      : saveAllKeyed;

    await save(
      state,
      oldState,
      { prefix, driver, serialize }
    );
  } catch (err) {
    console.warn(
      'redux-remember: persist error',
      err
    );
  }
};
