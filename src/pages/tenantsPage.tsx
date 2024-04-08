import {CircularProgress} from "@mui/material";
import useApiAuthContext from "../hooks/useApiAuthContext.ts";
import {useQuery} from "react-query";
import {getTenants} from "../lib/api/getTenants.ts";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TenantsTable from "../components/tables/tenantsTable.tsx";

export default function TenantsPage() {

    const {apiPrefix, accessToken} = useApiAuthContext()

    const {data, status} = useQuery({
        queryKey: ["tenants"], queryFn: () => {
            return getTenants({prefixUrl: apiPrefix, accessToken: accessToken})
        }
    })

    if (status === "loading") {
        return (<Box sx={{m: 0, p: 2, width: "100%", display: "flex", justifyContent: "center"}}>
            <CircularProgress/>
        </Box>)
    }

    if (status === "error") {
        return (<Box sx={{m: 0, p: 2, width: "100%", display: "flex", alignItems: "center", flexDirection: "column"}}>
            <Typography component="h3" variant="h5">Something Went Wrong</Typography>
            <Typography component="p">Try again</Typography>
        </Box>)
    }

    console.log(data)

    return (
        <Box sx={{m: 0, p: 2, width: "100%"}}>
            <TenantsTable/>
        </Box>
    )
}
