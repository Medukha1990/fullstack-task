import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { City, CityState } from '../../components/types/cityTypes'

const initialState: CityState = {
  cities: [],
  loading: false,
  error: null,
};


const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    citiesLoading(state) {
      state.loading = true;
    },
    citiesLoaded(state, action: PayloadAction<City[]>) {
      state.loading = false;
      state.cities = action.payload;
    },
    citiesError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { citiesLoading, citiesLoaded, citiesError } = citySlice.actions;

export default citySlice.reducer;
