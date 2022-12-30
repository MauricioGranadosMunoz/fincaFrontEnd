import { createSlice } from "@reduxjs/toolkit";

export const usuarioSlice = createSlice({
  name: "usuario",
  initialState: {
    usuario: [],
    trabajadores: [],
    rebajas: [],
    trabajadoresLoading: true,
    rebajasLoading: true,
    status: "checking", // 'not-authenticated', 'authenticated'
  },
  reducers: {
    setUsuarioLogout: (state) => {
      state.isLogged = false;
    },
    setLoadedToken: (state, action) => {
      state.status = "authenticated";
      state.usuario = action.payload.usuario;
    },
    setUsuarioLogged: (state, action) => {
      state.isLogged = true;
      state.usuario = action.payload.usuario;
      state.status = "authenticated";
    },
    setTrabajadores: (state, action) => {
      state.trabajadores = action.payload.trabajadores;
      state.trabajadoresLoading = false;
    },
    setRebajas: (state, action) => {
      state.rebajas = action.payload.rebajas;
      state.rebajasLoading = false;
    },
  },
});

export const {
  setUsuarioLogout,
  setUsuarioLogged,
  setLoadedToken,
  setTrabajadores,
  setRebajas,
} = usuarioSlice.actions;
