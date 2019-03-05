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