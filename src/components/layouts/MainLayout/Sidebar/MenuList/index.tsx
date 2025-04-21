import { useAppDispatch, useAppSelector } from "state";
import { useEffect } from "react";
import { setMenu } from "state/slice/menu";
import Skeleton from "@mui/material/Skeleton";

import Group from "components/layouts/MainLayout/Sidebar/MenuList/Group";
// import { useMenuAccess } from "data/repository/user";
import { setRepresentation } from "state/slice/representation";
// import { useRepresentationGet } from "data/repository/representation";

export default function MenuList() {
  // const request = useMenuAccess();
  // const requestRep = useRepresentationGet();

  const dispatch = useAppDispatch();
  const refreshTrigger = useAppSelector((state) => state.representation);

  // useEffect(() => {
  //   loadData();
  // }, []);

  // useEffect(() => {
  //   loadDataRep();
  // }, [
  //   refreshTrigger.ContractsCount,
  //   refreshTrigger.InvoicesCount,
  //   refreshTrigger.RequestsCount,
  // ]);

  // const loadData = () => {
  //   request.call({
  //     onSuccess: (res) => {
  //       dispatch(setMenu(res.data));
  //     },
  //   });
  // };

  // const loadDataRep = () => {
  //   requestRep.call({
  //     onSuccess: (res) => {
  //       dispatch(setRepresentation(res.data));
  //     },
  //   });
  // };

  // if (request.error && !request.loading) return null;
  return <Group />;
}

const LinkLoader = () => {
  return new Array(8)
    .fill(" ")
    .map((_, index) => (
      <Skeleton
        variant="rectangular"
        height="71px"
        width="100%"
        key={index}
        sx={{ my: "12px" }}
      />
    ));
};
