import { String_Const } from "common/constants/string_constants";
import { CusomerError, Either, left, right, UnAuthorize } from "common/core/either";
import { BaseResponse } from "common/core/response/api_response";
import { AddServiceAppointmentCommand } from "common/domain/command/service_appointment/add_service_appointment_command";
import { SignCompanyContractCommand } from "common/domain/command/sign_contract_command";
import { SignUpCommand } from "common/domain/command/signUpCommand";
import { CapacityEntity } from "common/domain/entity/capacity_entity";
import { ClientRepresentationEntity } from "common/domain/entity/client_representation_response";
import { CompanyContractEntity } from "common/domain/entity/contract_entity";
import { DocumentEntity } from "common/domain/entity/document_entity";
import { InvoiceEntity } from "common/domain/entity/invoice_entity";
import { OperationalAddressEntity } from "common/domain/entity/operational_address_entity";
import { ServiceTypeEnum } from "common/domain/enum/service_type_enum";
import { header, saveToken, tokenheader } from "core/src/utils/auth";
import { Api_URL } from "core/src/utils/url";

export async function cancelServiceAppointmentEmergencyApi(
  id: number
): Promise<Either<Error, BaseResponse<object>>> {
  try {
    var h = header();
    const response = await fetch(
      `${Api_URL}/ServiceAppointmentEmergency/${id}`,
      {
        method: "DELETE",
        headers: h,
      }
    );
    const data = await response.json();
    const result: BaseResponse<object> = data;
    if (result.Success) {
      return right(result);
    } else {
      return left(new CusomerError(result.Message));
    }
  } catch (error) {
    return left(new Error(String_Const.Error));
  }
}
