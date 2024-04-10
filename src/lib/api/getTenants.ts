import {fetchWithToken} from "../fetchWithToken.ts";
import {AxiosResponse} from "axios";
import {GetTenantsError, Tenant} from "../../types/api";

interface GetTenantsParams {
    prefixUrl: string,
    accessToken: string
}

export function getTenants({prefixUrl, accessToken}: GetTenantsParams): Promise<AxiosResponse<Tenant[], GetTenantsError>> {
    return fetchWithToken({url: `${prefixUrl}/tenants`, accessToken})
}
