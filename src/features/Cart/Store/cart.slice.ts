import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartResponse } from "../Types/cart.types";

export interface CartState {
  numberOfCartItems: number; // 👈 rename this
  cartId: string | null;
  products: CartItem[];
  totalCartPriced: number; // also fix typo here
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  numberOfCartItems: 0,
  cartId: null,
  products: [],
  totalCartPriced: 0,
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setCartnfo: function (state, action: PayloadAction<CartResponse>) {
      state.cartId = action.payload.cartId;
      state.products = action.payload.data.products;
      state.totalCartPriced = action.payload.data.totalCartPrice;
      state.numberOfCartItems = action.payload.data.products.reduce(
        (sum, item) => sum + item.count,
        0,
      );
    },
    removePorductFromCart: function (
      state,
      action: PayloadAction<{ id: string }>,
    ) {
      const productId = action.payload.id;
      const removedProduct = state.products.find(
        (item) => item.product.id === productId,
      );
      if (removedProduct) {
        state.products = state.products.filter(
          (item) => item.product.id !== productId,
        );
        state.numberOfCartItems -= removedProduct.count;
        state.totalCartPriced -= removedProduct.price * removedProduct.count;
      }
    },
  },
});
export const cartReducer = cartSlice.reducer;
export const { setCartnfo, removePorductFromCart } = cartSlice.actions;
