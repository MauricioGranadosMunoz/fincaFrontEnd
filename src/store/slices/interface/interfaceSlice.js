import { createSlice } from "@reduxjs/toolkit";

export const interfaceSlice = createSlice({
  name: "interface",
  initialState: {
    toastShow: true,
  },
  reducers: {
    setToggleToast: (state) => {
      state.toastShow = !state.toastShow;
    },
  },
});

export const {
    setToggleToast
} = interfaceSlice.actions;
