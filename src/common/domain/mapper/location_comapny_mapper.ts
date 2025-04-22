import { OtherCompanyLocationCommand } from "../command/other_company_location_command";
import { LocationCompanyEntity } from "../entity/location_company_entity";

// Mapper function
export function mapLocationCompanyEntityToCommand(
  entity: LocationCompanyEntity
): OtherCompanyLocationCommand {
  return new OtherCompanyLocationCommand(
    entity.Name,
    entity.Lat,
    entity.Long,
    entity.Capacity,
    entity.Comment,
    entity.PrimaryFirstName || "",
    entity.PrimaryLastName || "",
    entity.PrimaryPhonNumber || "",
    entity.OperationalAddressId,
    entity.Type,
    entity.CapacityId,
    entity.Address
  );
}

export function locationCompanyEntityHash(entity: LocationCompanyEntity): any {
  return `${
    entity.Name +
    entity.Lat +
    entity.Long +
    entity.Capacity +
    entity.Comment +
    entity.PrimaryFirstName +
    entity.PrimaryLastName +
    entity.PrimaryPhonNumber +
    entity.OperationalAddressId +
    entity.Type +
    entity.Address
  }`;
}
