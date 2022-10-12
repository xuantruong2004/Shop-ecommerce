import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const isItem = state.cartItem.find((item) => item.id === newItem.id);

      state.totalQuantity++;
      if (!isItem) {
        state.cartItem.push({
          id: newItem.id,
          productName: newItem.productName,
          image: newItem.image,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        isItem.quantity++;
        isItem.totalPrice = Number(newItem.price) + Number(isItem.totalPrice);
      }

      state.totalAmount = state.cartItem.reduce(
        (total, item) => total + Number(item.quantity) * Number(item.price),
        0
      );
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
