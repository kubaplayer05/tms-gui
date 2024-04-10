import axios, {AxiosResponse} from "axios";
import {AuthResponse, ValidationError} from "../../types/api";

interface GetTokenParams {
    prefixUrl: string,
    apiKey: string
}

export function getToken({prefixUrl, apiKey}: GetTokenParams): Promise<AxiosResponse<AuthResponse, ValidationError>> {

    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${prefixUrl}/api-key/${apiKey}`,
        headers: {}
    }

    return axios.request(config)
}
