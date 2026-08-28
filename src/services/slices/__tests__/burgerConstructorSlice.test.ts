import reducer, {
  addIngredient,
  setBun,
  removeIngredient,
  moveIngredientDown,
  moveIngredientUp,
  clearConstructor
} from '../burgerConstructorSlice';

describe('burgerConstructor reducer', () => {
  const ingredient = {
    id: '1',
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
  };

  test('возвращает начальное состояние для неизвестного action', () => {
    expect(reducer(undefined, { type: 'UNKNOWN' })).toEqual({
      bun: null,
      ingredients: []
    });
  });

  test('добавляет ингредиент', () => {
    const state = {
      bun: null,
      ingredients: []
    };

    expect(reducer(state, addIngredient(ingredient))).toEqual({
      bun: null,
      ingredients: [ingredient]
    });
  });

  test('устанавливает булку', () => {
    const state = {
      bun: null,
      ingredients: []
    };

    expect(reducer(state, setBun(ingredient))).toEqual({
      bun: ingredient,
      ingredients: []
    });
  });

  test('удаляет ингредиент', () => {
    const state = {
      bun: null,
      ingredients: [ingredient]
    };

    expect(reducer(state, removeIngredient('1'))).toEqual({
      bun: null,
      ingredients: []
    });
  });

  test('перемещает ингредиент вниз', () => {
    const firstIngredient = { ...ingredient, id: '1', name: 'Первый' };
    const secondIngredient = { ...ingredient, id: '2', name: 'Второй' };

    const state = {
      bun: null,
      ingredients: [firstIngredient, secondIngredient]
    };

    expect(reducer(state, moveIngredientDown(0)).ingredients).toEqual([
      secondIngredient,
      firstIngredient
    ]);
  });

  test('перемещает ингредиент вверх', () => {
    const firstIngredient = { ...ingredient, id: '1', name: 'Первый' };
    const secondIngredient = { ...ingredient, id: '2', name: 'Второй' };

    const state = {
      bun: null,
      ingredients: [firstIngredient, secondIngredient]
    };

    expect(reducer(state, moveIngredientUp(1)).ingredients).toEqual([
      secondIngredient,
      firstIngredient
    ]);
  });

  test('очищает конструктор', () => {
    const state = {
      bun: ingredient,
      ingredients: [ingredient]
    };

    expect(reducer(state, clearConstructor())).toEqual({
      bun: null,
      ingredients: []
    });
  });
});
