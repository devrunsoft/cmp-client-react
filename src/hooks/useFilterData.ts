
import {TableCtx} from "cmp-core/src/Datatable/TableConfigProvider";

import useFilterData, {UseFilterOutputType, UseFilterInputType} from "core/src/hooks/useFilterData";
import { useContext } from "react";

export type {UseFilterOutputType, UseFilterInputType} from "core/src/hooks/useFilterData";

function useFilterDataDecorator<T>({initData, handleFetchFn}: Omit<UseFilterInputType<T>, "pageSize">): UseFilterOutputType<T> {
  const {pageSize} = useContext(TableCtx);
  return useFilterData({initData, handleFetchFn, pageSize});
}

export default useFilterDataDecorator;