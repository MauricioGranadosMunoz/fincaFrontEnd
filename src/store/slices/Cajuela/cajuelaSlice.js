import { createSlice } from "@reduxjs/toolkit";

export const cajuelaSlice = createSlice({
  name: "cajuela",
  initialState: {
    cajuelaSemana: [],
    cajuelasLoading: true,
    cajuelasError: false,
    precioActual: 0,
  },
  reducers: {
    setCajuelasSemana: (state, action) => {
      state.cajuelaSemana = action.payload.cajuelaSemana;
      state.cajuelasLoading = false;
    },
    setCajuelasError: (state) => {
      state.cajuelasError = true;
      state.cajuelasLoading = false;
    },
    setPrecioActual: (state, action) => {
      state.precioActual = action.payload;
    },
  },
});

export const { setCajuelasSemana, setCajuelasError, setPrecioActual } =
  cajuelaSlice.actions;
