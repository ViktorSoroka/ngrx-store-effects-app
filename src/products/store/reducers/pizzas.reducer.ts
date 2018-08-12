import { Pizza } from '../../models/pizza.model';
import * as fromPizzas from '../actions/pizzas.action';

export interface PizzasState {
  data: Pizza[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: PizzasState = {
  data: [],
  loaded: false,
  loading: false,
};

export function reducer(state = initialState, action: fromPizzas.PizzasAction): PizzasState {
  switch (action.type) {
    case fromPizzas.LOAD_PIZZAS: {
      return {
        ...state,
        loading: true,
      };
    }
    case fromPizzas.LOAD_PIZZAS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }
    case fromPizzas.LOAD_PIZZAS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    }
  }

  return state;
}
