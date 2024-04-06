import axios from "axios";
import {AuthResponse} from "../../types/api";

interface GetTokenParams {
    prefixUrl: string,
    apiKey: string
}

export function getToken({prefixUrl, apiKey}: GetTokenParams) {

    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${prefixUrl}/api-key/${apiKey}`,
        headers: {}
    }

    return axios.request<AuthResponse>(config)
}
