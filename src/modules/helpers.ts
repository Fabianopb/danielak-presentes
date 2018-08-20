import * as _ from 'lodash';

type FunctionType = (...args: any[]) => any;
type ActionCreatorsMapObject = { [actionCreator: string]: FunctionType };
export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;

interface Action<T extends string> { type: T; }
interface ActionWithPayload<T extends string, P> extends Action<T> { payload: P; }

export function createAction<T extends string>(type: T): Action<T>;
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;
export function createAction<T extends string, P>(type: T, payload?: P) {
  return payload !== undefined ? { type, payload } : { type };
}

/**
 * Transform currency format
 * @param {number} value value to be converted
 * @returns {string}
 */
export const currencyFormat = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

export const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`
});

export const getImageNameFromUrl = (url: string): string => {
  return url.substring(url.substring(url.lastIndexOf('/'), 0).lastIndexOf('/') + 1);
};

export const isAdminPage = (path: string): boolean => {
  return _.includes(path, 'admin');
}
