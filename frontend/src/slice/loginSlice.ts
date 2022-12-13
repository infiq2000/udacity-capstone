import { createSlice } from "@reduxjs/toolkit";
export interface LoginState {
  accessToken: string;
  userData: any;
}
const initialState: LoginState = {
  accessToken: "",
  userData: {},
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      if (action?.payload?.userData) {
        state.userData = action?.payload?.userData;
      }
      if (action?.payload?.accessToken) {
        localStorage.setItem("access_token", action?.payload?.accessToken);
        state.accessToken = action?.payload?.accessToken;
      }
    },
    loginFail: (state) => {
      localStorage.removeItem("access_token");
      state.accessToken = "";
      state.userData = {};
    },
    logout: (state) => {
      localStorage.removeItem("access_token");
      state.accessToken = "";
      state.userData = {};
    },
  },
});
export const { loginSuccess, loginFail, logout } = loginSlice.actions;
export default loginSlice.reducer;
// export const loginReducer = (state: IState = initialState, action: IAction) => {
//   switch (action.type) {
//     case "SUCCESS":
//       if (action.payload.userData) {
//         localStorage.setItem(
//           "user_data",
//           JSON.stringify(action.payload.userData)
//         );
//       }
//       if (action.payload.accessToken) {
//         localStorage.setItem("access_token", action.payload.accessToken);
//       }
//       return {
//         ...state,
//         userData: action.payload.userData,
//         accessToken: action.payload.accessToken,
//       };
//     case "FAILURE":
//       localStorage.removeItem("user_data");
//       localStorage.removeItem("access_token");
//       return {
//         ...state,
//         userData: {},
//         accessToken: "",
//       };
//     default:
//       return state;
//   }
// };
