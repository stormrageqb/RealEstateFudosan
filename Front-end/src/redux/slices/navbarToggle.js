import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,

  loading: false,
  error: null,
};

const navbarToggleSlice = createSlice({
  name: "deal",
  initialState,
  reducers: {
    showNavbar: state => {
      state.isOpen = true; 
    },
    hideNavbar: state => {
      state.isOpen = false;
    },
  },
});

export const { actions, reducer } = navbarToggleSlice;
