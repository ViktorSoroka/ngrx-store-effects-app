import { Topping } from '../../models/topping.model';
import * as fromToppings from '../actions/toppings.action';

export interface ToppingsState {
  entities: { [id: string]: Topping };
  loaded: boolean;
  loading: boolean;
  selectedToppings: number[];
}

export const initialState: ToppingsState = {
  entities: {},
  loaded: false,
  loading: false,
  selectedToppings: [],
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
      const toppings = action.payload;

      const entities = toppings.reduce((acc: { [id: string]: Topping }, pizza: Topping) => {
        return {
          ...acc,
          [pizza.id]: pizza,
        };
      }, {});

      return {
        ...state,
        loading: false,
        loaded: true,
        entities,
      };
    }

    case fromToppings.SELECT_TOPPINGS: {
      const selectedToppings = action.payload;

      return {
        ...state,
        selectedToppings,
      };
    }
  }

  return state;
}

export const getToppingEntities = ({ entities }: ToppingsState) => entities;
export const getSelectedToppings = ({ selectedToppings }: ToppingsState) => selectedToppings;
export const getToppingsLoaded = ({ loaded }: ToppingsState) => loaded;
export const getToppingsLoading = ({ loading }: ToppingsState) => loading;
