import { unionWith, eqBy, reverse, prop, reject, propEq } from 'ramda';

interface IWithID {
  id: number;
}

export function union<T extends IWithID>(payload: Array<T>, entities: ReadonlyArray<T>) {
  return unionWith<T>(eqBy(prop('id')), reverse(payload), entities);
}

export function deleteData<T extends IWithID>(payload: T, entities: ReadonlyArray<T>) {
  return reject<T>(propEq('id', payload.id), entities);
}

export const fetchErrors = (storeName: string, state: any) => {
  return [
    state.request[storeName].fetchById.error,
    state.request[storeName].fetch.error,
    state.request[storeName].create.error,
    state.request[storeName].update.error,
    state.request[storeName].remove.error
  ];
};
