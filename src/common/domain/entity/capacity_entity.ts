import { NameAndValue } from "./name_and_value";

export type CapacityEntity = {
  Id?: number;
  Name?: string;
  ServiceType?: number;
  Qty?: number;
  Enable?: boolean;
};

export const mapCapacityToNameAndValue = (
  capacity: CapacityEntity[]
): NameAndValue[] => {
  return capacity.map((e) => ({
    name: e.Name ?? "",
    value: e.Id,
  }));
};
