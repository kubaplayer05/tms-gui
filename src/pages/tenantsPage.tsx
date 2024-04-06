import {Container} from "@mui/material";
import useApiAuthContext from "../hooks/useApiAuthContext.ts";
import {useQuery} from "react-query";
import {getTenants} from "../lib/api/getTenants.ts";

export default function TenantsPage() {

    const {apiPrefix, accessToken} = useApiAuthContext()

    const {data, status, error} = useQuery({
        queryKey: ["tenants"], queryFn: () => {
            return getTenants({prefixUrl: apiPrefix, accessToken: accessToken})
        }
    })

    return (
        <Container sx={{m: 0, p: 2}}>

        </Container>
    )
}
