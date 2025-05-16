import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prepaid: null,
  postpaid: null,
  dth: null,
  fasttag: null,
  landline: null,
  electricity: null,
  water: null,
  loading: false,
};

const operatorSlice = createSlice({
  name: "operator",
  initialState,
  reducers: {
    setPrepaid: (state, action) => {
      state.prepaid = action.payload;
      state.loading = false;
    },
    setPostpaid: (state, action) => {
      state.postpaid = action.payload;
      state.loading = false;
    },
    setDth: (state, action) => {
      state.dth = action.payload;
      state.loading = false;
    },
    setFasttag: (state, action) => {
      state.fasttag = action.payload;
      state.loading = false;
    },
    setLandline: (state, action) => {
      state.landline = action.payload;
      state.loading = false;
    },
    setElectricity: (state, action) => {
      state.electricity = action.payload;
      state.loading = false;
    },
    setWater: (state, action) => {
      state.water = action.payload;
      state.loading = false;
    },
    paymentStart: (state) => {
      state.loading = true;
    },
    paymentSuccess: (state) => {
      state.loading = false;
    },
    paymentFailure: (state) => {
      state.loading = false;
    },
    setInitial: (state) => {
      state.prepaid = null;
      state.postpaid = null;
      state.dth = null;
      state.fasttag = null;
      state.landline = null;
      state.electricity = null;
      state.water = null;
      state.loading = false;
    },
  },
});

export const {
  setPrepaid,
  setPostpaid,
  paymentStart,
  paymentSuccess,
  paymentFailure,
  setDth,
  setFasttag,
  setElectricity,
  setWater,
  setLandline,
  setInitial,
} = operatorSlice.actions;
export default operatorSlice.reducer;
