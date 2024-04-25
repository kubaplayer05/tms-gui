import {fetchWithToken} from "../fetchWithToken.ts";
import {AxiosResponse} from "axios";
import {ValidationError} from "../../types/api";

interface DeleteTenantParams {
    prefixUrl: string,
    accessToken: string,
    tenantId: string
}

export function deleteTenant({
                                 prefixUrl,
                                 accessToken,
                                 tenantId
                             }: DeleteTenantParams): Promise<AxiosResponse<string, ValidationError>> {
    return fetchWithToken({
        url: `${prefixUrl}/tenant/${tenantId}`, accessToken, options: {
            method: "DELETE"
        }
    })
}
