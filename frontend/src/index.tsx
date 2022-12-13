import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./config/store";
import { createTheme, ThemeProvider } from "@mui/material";
import "./index.css";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    smmd: true;
  }
}

const defaultTheme = createTheme();
const theme = createTheme({
  breakpoints: {
    values: {
      ...defaultTheme.breakpoints.values,
      smmd: 750,
    },
  },
});
root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ThemeProvider>
);
