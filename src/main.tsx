import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "uikit/src/ErrorBoundary";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "assets/scss/global.scss";
import "simplebar-react/dist/simplebar.min.css";
import { HelmetProvider } from "react-helmet-async";
import ErrorPage from "uikit/src/Error";
import { store } from "state";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <HelmetProvider>
      <ErrorBoundary fallback={<ErrorPage />}>
          <App />
        </ErrorBoundary>
      </HelmetProvider>
    </BrowserRouter>
    </Provider>
</StrictMode>
);
