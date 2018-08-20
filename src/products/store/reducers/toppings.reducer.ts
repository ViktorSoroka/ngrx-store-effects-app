import { Topping } from '../../models/topping.model';
import * as fromToppings from '../actions/toppings.action';

export interface ToppingsState {
  entities: { [id: string]: Topping };
  loaded: boolean;
  loading: boolean;
}

export const initialState: ToppingsState = {
  entities: {},
  loaded: false,
  loading: false,
};

export function reducer(state = initialState, action: fromToppings.ToppingsAction): ToppingsState {
  switch (action.type) {
    case fromToppings.LOAD_TOPPINGS: {
      return {
        ...state,
        loading: true,
      };
    }
    case fromToppings.LOAD_TOPPINGS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }
    case fromToppings.LOAD_TOPPINGS_SUCCESS: {
      const data = action.payload;

      const entities = data.reduce((acc: { [id: string]: Topping }, pizza: Topping) => {
        return {
          ...acc,
          [pizza.id]: pizza
        };
      }, {});

      return {
        ...state,
        loading: false,
        loaded: true,
        entities,
      };
    }
  }

  return state;
}

export const getToppingsEntities = (state: ToppingsState) => state.entities;
export const getToppingsLoaded = (state: ToppingsState) => state.loaded;
export const getToppingsLoading = (state: ToppingsState) => state.loading;
