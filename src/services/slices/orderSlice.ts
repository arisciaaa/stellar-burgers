import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { orderBurgerApi, getOrderByNumberApi } from '../../utils/burger-api';

import { TOrder } from '../../utils/types';

type OrderData = {
  _id: string;
  status: string;
  name: string;
  owner: {
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
  number: number;
  price: number;
};

type OrderState = {
  orderRequest: boolean;
  orderModalData: OrderData | null;
  selectedOrder: TOrder | null;
  error: string | null;
};

const initialState: OrderState = {
  orderRequest: false,
  orderModalData: null,
  selectedOrder: null,
  error: null
};

export const orderBurgerThunk = createAsyncThunk(
  'order/create',
  (ingredients: string[]) => orderBurgerApi(ingredients)
);

export const getOrderByNumberThunk = createAsyncThunk(
  'order/getOrderByNumber',
  (number: number) => getOrderByNumberApi(number)
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orderModalData = null;
      state.selectedOrder = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurgerThunk.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(orderBurgerThunk.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(orderBurgerThunk.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Ошибка оформления заказа';
      })

      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.selectedOrder = action.payload.orders[0];
      })
      .addCase(getOrderByNumberThunk.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка загрузки заказа';
      });
  }
});

export const { clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
