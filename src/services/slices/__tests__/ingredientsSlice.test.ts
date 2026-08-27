import reducer, { getIngredientsThunk } from '../ingredientsSlice';

describe('ingredients reducer', () => {
  test('возвращает начальное состояние для неизвестного action', () => {
    expect(reducer(undefined, { type: 'UNKNOWN' })).toEqual({
      ingredients: [],
      isLoading: false,
      error: null
    });
  });

  test('обрабатывает pending', () => {
    const state = {
      ingredients: [],
      isLoading: false,
      error: null
    };

    const action = { type: getIngredientsThunk.pending.type };

    expect(reducer(state, action)).toEqual({
      ingredients: [],
      isLoading: true,
      error: null
    });
  });

  test('обрабатывает fulfilled', () => {
    const state = {
      ingredients: [],
      isLoading: true,
      error: null
    };

    const ingredients = [
      {
        _id: '1',
        name: 'Булка',
        type: 'bun',
        proteins: 10,
        fat: 10,
        carbohydrates: 10,
        calories: 100,
        price: 100,
        image: 'image',
        image_mobile: 'image',
        image_large: 'image'
      }
    ];

    const action = {
      type: getIngredientsThunk.fulfilled.type,
      payload: ingredients
    };

    expect(reducer(state, action)).toEqual({
      ingredients,
      isLoading: false,
      error: null
    });
  });

  test('обрабатывает rejected', () => {
    const state = {
      ingredients: [],
      isLoading: true,
      error: null
    };

    const action = {
      type: getIngredientsThunk.rejected.type,
      error: {
        message: 'Ошибка'
      }
    };

    expect(reducer(state, action)).toEqual({
      ingredients: [],
      isLoading: false,
      error: 'Ошибка'
    });
  });
});
