import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wallet: null,
  loading: false,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    getBalance: (state) => {
      state.loading = true;
    },
    setBalance: (state, action) => {
      state.wallet = action.payload;
      state.loading = false;
    },
  },
});

export const { getBalance, setBalance } = walletSlice.actions;
export default walletSlice.reducer;
