import axios from "axios";

interface FetchWithTokenParams {
    url: string
    accessToken: string,
    options?: object,
}

export function fetchWithToken({url, accessToken, options}: FetchWithTokenParams) {

    const config = {
        ...options,
        url: url,
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }

    return axios.request(config)
}
