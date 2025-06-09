import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addTocart(state, action) {
      const item = action.payload;
      const existingItem = state.find(i => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.push(item);
      }
    },
    removeFromcart(state, action) {
      const itemId = action.payload;
      const existingItemIndex = state.findIndex(i => i.id === itemId);

      if (existingItemIndex !== -1) {
        const existingItem = state[existingItemIndex];

        if (existingItem.quantity > 1) {
          //Reducing the count of the item
          existingItem.quantity -= 1;
        } else {
          //Removing the item completely
          state.splice(existingItemIndex, 1);
        }
      }
    },
    clearCart() {
      return []
    }
  }
});

//actions are sent this way and for reducer just export the slice.reducer and import using any name which is meaningful
export const { addTocart } = cartSlice.actions;
export default cartSlice.reducer