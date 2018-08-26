import * as fromToppings from './toppings.action';

describe('Toppings Actions', () => {
  describe('LoadToppings Actions', () => {
    describe('LoadToppings', () => {
      it('should crete an action', () => {
        const action = new fromToppings.LoadToppings();

        expect({ ...action }).toEqual({
          type: fromToppings.LOAD_TOPPINGS,
        });
      });
    });

    describe('LoadToppingsFail', () => {
      it('should crete an action', () => {
        const payload = { message: 'Load Error' };
        const action = new fromToppings.LoadToppingsFail(payload);

        expect({ ...action }).toEqual({
          type: fromToppings.LOAD_TOPPINGS_FAIL,
          payload,
        });
      });
    });

    describe('LoadToppingsSuccess', () => {
      it('should crete an action', () => {
        const payload = [{ id: 1, name: 'anchovy' }, { id: 2, name: 'bacon' }];
        const action = new fromToppings.LoadToppingsSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromToppings.LOAD_TOPPINGS_SUCCESS,
          payload,
        });
      });
    });

    describe('SelectToppings', () => {
      it('should crete an action', () => {
        const payload = [1, 2];
        const action = new fromToppings.SelectToppings(payload);

        expect({ ...action }).toEqual({
          type: fromToppings.SELECT_TOPPINGS,
          payload,
        });
      });
    });
  });
});
