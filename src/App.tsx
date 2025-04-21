import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { ToastContainer } from "react-toastify";

import Route from "./routes";
import getTheme from "./theme/index";

function App() {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={getTheme("light")}>
          <CssBaseline />
          <Route />
          {/* <AppVersion /> */}
          <ToastContainer
            position="bottom-center"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnHover
            theme="colored"
          />
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}

export default App;
