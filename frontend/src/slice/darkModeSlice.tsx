import { createSlice } from "@reduxjs/toolkit";
export interface darkModeState {
  isDarkMode: boolean;
}
const initialState: darkModeState = {
  isDarkMode: true,
};

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    setDarkMode: (state, action) => {
      state.isDarkMode = action?.payload;
    },
  },
});
export const { setDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
