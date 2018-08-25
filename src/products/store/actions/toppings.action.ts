import { Action } from '@ngrx/store';

import { Topping } from '../../models/topping.model';

export const LOAD_TOPPINGS = '[Products] Load Toppings';
export const LOAD_TOPPINGS_FAIL = '[Products] Load Toppings Fail';
export const LOAD_TOPPINGS_SUCCESS = '[Products] Load Toppings Success';
export const SELECT_TOPPINGS = '[Products] Select Toppings';

export class loadToppings implements Action {
  readonly type = LOAD_TOPPINGS;
}

export class loadToppingsFail implements Action {
  readonly type = LOAD_TOPPINGS_FAIL;
  constructor(public payload: any) {}
}

export class loadToppingsSuccess implements Action {
  readonly type = LOAD_TOPPINGS_SUCCESS;
  constructor(public payload: Topping[]) {}
}

export class selectToppings implements Action {
  readonly type = SELECT_TOPPINGS;
  constructor(public payload: number[]) {}
}

export type ToppingsAction = loadToppings | loadToppingsFail | loadToppingsSuccess | selectToppings;
