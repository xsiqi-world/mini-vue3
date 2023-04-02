export const extend = Object.assign;

export const isObject = (val) => {
  return val !== null && typeof val === 'object';
}

export const hasChanged = (newValue, value) => !Object.is(newValue, value);