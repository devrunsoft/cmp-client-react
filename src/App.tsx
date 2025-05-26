import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { ToastContainer } from "react-toastify";

import Route from "./routes";
import getTheme from "./theme";
import { LoadingProvider } from "components/loading/loading_context";
import LoadingModal from "components/loading/loading_modal";
import { AddressProvider } from "common/context/address_context";
import { SignableContractProvider } from "components/context_api/signable_contract_context";
import { InvoicePayableProvider } from "components/context_api/payable_invoice_context";
import { ShoppingCardProvider } from "components/context_api/shopping_card_context";
import { Site_URL } from "core/src/utils/url";

function App() {
  const favicon = document.querySelector("link[rel='icon']");
  if (favicon) {
    favicon.setAttribute("href", `${Site_URL}/api/Common/Logo`);
  }
  return (
    <>
      <StyledEngineProvider injectFirst>
        <AddressProvider address={[]} defaultAddress={{}}>
          <LoadingProvider>
            <SignableContractProvider>
              <InvoicePayableProvider>
                <ShoppingCardProvider>
                  <LoadingModal />
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
                </ShoppingCardProvider>
              </InvoicePayableProvider>
            </SignableContractProvider>
          </LoadingProvider>
        </AddressProvider>
      </StyledEngineProvider>
    </>
  );
}

export default App;
