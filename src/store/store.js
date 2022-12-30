import { configureStore } from "@reduxjs/toolkit";
import { cajuelaSlice } from "./slices/Cajuela";
import { usuarioSlice } from "./slices/Usuario/usuarioSlice";

export const store = configureStore({
  reducer: {
    usuario: usuarioSlice.reducer,
    cajuela: cajuelaSlice.reducer,
  },
});
