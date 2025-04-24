import useApi, { UseApiType, UseApiInputType } from "core/src/hooks/useApi";

const useApiDecorator: UseApiType = function <T, O = undefined>(
  i: UseApiInputType
) {
  return useApi<T, O>(i);
};

export default useApiDecorator;
