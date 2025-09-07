import { ClientBaseServiceEntity } from "cmp-core/src/entity/clientBaseService";
import { String_Const } from "common/constants/string_constants";
import { CusomerError, Either, left, right, UnAuthorize } from "common/core/either";
import { BaseResponse } from "common/core/response/api_response";
import { header, saveToken, tokenheader } from "core/src/utils/auth";
import { Api_URL } from "core/src/utils/url";

export async function getServiceAppointmentApi(Id: number): Promise<Either<Error, ClientBaseServiceEntity>> {
    try {
        var h = header();
        const response = await fetch(`${Api_URL}/ServiceAppointment/${Id}`, {
            method: 'GET',
            headers: h,
        });
        const data = await response.json();
        const result: BaseResponse<ClientBaseServiceEntity> = data;

        if (result.Success) {
            return right(result.Data);
        } else {
            return left(new CusomerError(result.Message));
        }
    } catch (error) {
        return left(new Error(String_Const.Error));
    }
}
