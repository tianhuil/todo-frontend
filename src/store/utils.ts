export function action<T extends string, P>(type: T, payload: P): {type: T, payload: P} {
  return {type, payload}
}

export enum Status {
  // string values are route urls
  All = '/All',
  Completed = '/Completed',
  Incompleted = '/Incompleted',
}
