import { String_Const } from "common/constants/string_constants";
import { CusomerError, Either, left, right, UnAuthorize } from "common/core/either";
import { BaseResponse } from "common/core/response/api_response";
import { SignCompanyContractCommand } from "common/domain/command/sign_contract_command";
import { CapacityEntity } from "common/domain/entity/capacity_entity";
import { ClientRepresentationEntity } from "common/domain/entity/client_representation_response";
import { CompanyContractEntity } from "common/domain/entity/contract_entity";
import { InvoiceEntity } from "common/domain/entity/invoice_entity";
import { OperationalAddressEntity } from "common/domain/entity/operational_address_entity";
import { ServiceTypeEnum } from "common/domain/enum/service_type_enum";
import { Api_URL } from "core/src/utils/url";
import { header } from "core/src/utils/auth";


export async function CheckInvoiceApi(invoiceId: number): Promise<Either<Error, InvoiceEntity>> {
    try {
        var h =  header();
        const response = await fetch(`${Api_URL}/Invoice/CheckPayment/${invoiceId}`, {
            method: 'GET',
            headers: h,
        });
        const data = await response.json();
        const result: BaseResponse<InvoiceEntity> = data;

        if (result.Success) {
            return right(result.Data);
        } else {
            return left(new CusomerError(result.Message));
        }
    } catch (error) {
        return left(new Error(String_Const.Error));
    }
}
