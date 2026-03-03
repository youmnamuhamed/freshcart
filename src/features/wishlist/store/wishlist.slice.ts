import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WishlistProductDetails, WishlistResponse } from "../types/wishlist.types";

export interface WishlistState {
  numberOfWishlistItems: number;
  wishlistId: string | null;
  products: WishlistProductDetails[];
  isLoading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  numberOfWishlistItems: 0,
  wishlistId: null,
  products: [] as WishlistProductDetails[],
  isLoading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlistInfo: function (state, action: PayloadAction<WishlistResponse>) {
      state.products = action.payload.data;
      state.numberOfWishlistItems = action.payload.count;
    },

    removeProductFromWishlistState: function (
      state,
      action: PayloadAction<{ id: string }>,
    ) {
      const productId = action.payload.id;
      state.products = state.products.filter(
        (item) => item.id !== productId,
      );
      state.numberOfWishlistItems = state.products.length;
    },

    clearWishlist: function (state) {
      state.wishlistId = null;
      state.numberOfWishlistItems = 0;
      state.products = [];
    },
  },
});

export const wishlistReducer = wishlistSlice.reducer;
export const { setWishlistInfo, removeProductFromWishlistState, clearWishlist } =
  wishlistSlice.actions;