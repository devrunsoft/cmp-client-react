import { String_Const } from "common/constants/string_constants";
import {
  CusomerError,
  Either,
  left,
  right,
} from "common/core/either";
import { Api_URL } from "core/src/utils/url";

export async function ForgotPasswordApi(
  email: string
): Promise<Either<Error, boolean>> {
  try {
    const response = await fetch(`${Api_URL}/User/ForgotPassword`, {
      method: "POST",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json-patch+json",
      },
      body: JSON.stringify({ Email: email }),
    });
    const data = await response.json();
    if (data.token || data.Success) {
      // AppConfig.token = data.token;
      return right(data.registered);
    } else {
      return left(new CusomerError(data.Message));
    }
  } catch (error) {
    return left(new Error(String_Const.Error));
  }
}
