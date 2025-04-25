import { Outlet, useLocation } from "react-router-dom";
import HasAccess from "uikit/src/HasAccess";
import Box from "@mui/material/Box";
import Sidebar from "components/layouts/MainLayout/Sidebar";
import { styled } from "@mui/material/styles";
import AppBar from "components/layouts/MainLayout/Navbar";
import { APP_VERSION_HEIGHT, APPBAR_HEIGHT } from "cmp-core/src/Contants/const";
import Breadcrumb from "uikit/src/Breadcrumb";
import { Helmet } from "react-helmet-async";
import { useEffect, useMemo, useState } from "react";
import { DataFetchingWrapper } from "cmp-core/src/DataFetchingWrapper";
import { ProviderProvider } from "cmp-core/src/Context/Providers";
import { useMediaQuery, useTheme } from "@mui/material";
import { getBreadcrumbFromPath, LinkInfo } from "common/menu-items";
import { useGetAllOperationalAddress } from "data/repository/operationalAddress";
import { AddressProvider } from "common/context/address_context";
import { TermsAndConditionProvider } from "components/context_api/terms_and_conditions";
import TermConditionModal from "components/term";

export default function MainLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };
  const { pathname } = useLocation();

  const { parent, info, display } = useMemo<{
    parent?: LinkInfo;
    info?: LinkInfo;
    display: boolean;
  }>(() => {
    const output = getBreadcrumbFromPath(pathname);
    if (!output) return { display: false };
    return { ...output, display: true };
  }, [pathname]);

  const displayBreadcrumb = info?.breadCrumb && display && parent;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const request = useGetAllOperationalAddress();

  useEffect(() => {
    request.call({});
  }, []);

  return (
    <HasAccess>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <AppBar onMenuClick={toggleDrawer} />
        <Sidebar open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        <Main isSmallScreen={isSmallScreen}>
          <Helmet>
            <title>{info?.title || "CLIENT PORTAL"}</title>
          </Helmet>
          {!!displayBreadcrumb && (
            <Breadcrumb
              links={[{ title: parent.title }, { title: info.title }]}
            />
          )}
          <DataFetchingWrapper loading={request.loading}>
            {request.data && (
              <AddressProvider
                address={request.data.data}
                defaultAddress={
                  request.data.data.length == 0 ? {} : request.data.data[0]
                }
              >
                <TermsAndConditionProvider>
                  <Outlet />
                  <TermConditionModal />
                </TermsAndConditionProvider>
              </AddressProvider>
            )}
          </DataFetchingWrapper>
        </Main>
      </Box>
    </HasAccess>
  );
}

const Main = styled("main")<{ isSmallScreen: boolean }>(
  ({ isSmallScreen }) => ({
    flexGrow: 1,
    background: "white",
    width: "100%",
    height: `calc(100vh - ${APP_VERSION_HEIGHT + APPBAR_HEIGHT}px)`,
    borderRadius: "10px",
    overflow: "hidden",
    marginRight: isSmallScreen ? "0" : "50px",
    marginTop: APPBAR_HEIGHT + "px",
    marginBottom: APP_VERSION_HEIGHT - 10 + "px",
  })
);
